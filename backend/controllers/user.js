import sanitize from "mongo-sanitize";
import TryCatch from "../middlewares/TryCatch.js";
import { loginSchema, registerSchema } from "../config/zod.js";
import { redisClient } from "../index.js";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import crypto, { verify } from 'crypto';
import sendMail from "../config/sendMail.js";
import { getOtpHtml, getVerifyEmailHtml } from "../config/html.js";
import { generateAccessToken, generateToken, revokeRefreshToken, verifyrefreshToken } from "../config/generateToken.js";

export const registerUser = TryCatch(async (req, res) => {

    const sanitizedBody = sanitize(req.body);          

    const validation = registerSchema.safeParse(sanitizedBody);    

    if (!validation.success) {
        return res.status(400).json({
            errors: validation.error.issues,
        });
    }

    const { name, email, password } = validation.data;

    const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;

    const isRateLimited = await redisClient.get(rateLimitKey);

    if (isRateLimited) {
        return res.status(429).json({
            message: "Too many requests... Try again later",
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyKey = `verify:${verifyToken}`;

    const dataToStore = JSON.stringify({
        name,
        email,
        password: hashedPassword,
    });

    await redisClient.set(verifyKey, dataToStore, { EX: 300 });   // 5 mins

    const subject = "Verify Your Email for Account Creation";
    const html = getVerifyEmailHtml({ email, token: verifyToken });

    await sendMail({ email, subject, html });

    await redisClient.set(rateLimitKey, "true", { EX: 60 });

    return res.json({
        message: "Verification link sent. Expires in 5 minutes",
    });
});

export const verifyUser = TryCatch(async(req, res)=>{

    const {token} = req.params;
     
    if(!token){
        return res.status(400).json({
            message: "Verification token required"
        })
    };

    const verifyKey = `verify:${token}`;

    const userDataJson = await redisClient.get(verifyKey)

    if(!userDataJson){
        return res.status(400).json({
            message: "Verification Link Expired"
        });
    }

    await redisClient.del(verifyKey);

    const userData = JSON.parse(userDataJson);

    const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
    });

    res.status(200).json({
        message: "Email Verified Successfully! Your account has been created",
        user: {_id: newUser._id, name: newUser.name, email: newUser.email},
    })

});

export const loginUser = TryCatch(async(req, res)=>{
     const sanitizedBody = sanitize(req.body);          

    const validation = loginSchema.safeParse(sanitizedBody);    

    if (!validation.success) {
        return res.status(400).json({
            errors: validation.error.issues,
        });
    }

    const { email, password } = validation.data;

    const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;

    if(await redisClient.get(rateLimitKey)){
        return res.status(429).json({
            message: "Too many requests, try again later",
        });
    };

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials",
        })
    };

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword){
        return res.status(400).json({
            message: "Invalid Credentials",
        })
    };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpKey = `otp:${email}`;

    await redisClient.set(otpKey, JSON.stringify(otp), {
        EX: 300,
    });

    const subject = "OTP for verification";

    const html = getOtpHtml({email, otp});

    await sendMail({email, subject, html});

    await redisClient.set(rateLimitKey, "true", {
        EX: 60,
    });

    res.json({
        message: "OTP sent to registered email",
    });

});


export const verifyOtp = TryCatch(async (req, res) =>{

    const {email, otp} = req.body;

    if(!email || !otp){
        return res.status(400).json({
            message: "Please provide all details",
        });
    }

    const otpKey =`otp:${email}`

    const storedOtpString = await redisClient.get(otpKey);

    if(!storedOtpString){
        return res.status(400).json({
            message: "Otp Expired"
        });
    }

    const storedOtp = JSON.parse(storedOtpString)

    if(storedOtp !==otp){
        return res.status(400).json({
            message: "Invaid Otp"
        });
    }

    await redisClient.del(otpKey);

    let user = await User.findOne({email});

    const token = await generateToken(user._id, res);

    res.status(200).json({
        message: `Welcome ${user.name}`,
        user,
    })
});


export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    
    res.json(user);
});

export const refreshToken = TryCatch(async (req, res) =>{
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message: "Invalid refresh token",
        });
    }

    const decode = await verifyrefreshToken(refreshToken);

    if(!decode){
        return res.status(401).json({
            message: "Invalid refresh token",
        });
        }

        generateAccessToken(decode.id, res);

        res.status(200).json({
            message: "Token refreshed",
        });
    }
);


export const logOutUser = TryCatch(async (req, res) =>{
    const userId = req.user._id;

    await revokeRefreshToken(userId);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    await redisClient.del(`user:${userId}`);

    res.json({
        message: "Logged Out Successfully",
    });

});

