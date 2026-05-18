import jwt from "jsonwebtoken";
import { redisClient } from "../index.js";


export const generateToken = async(id, res)=>{
    const accessToken = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1m",
    });

    const refreshToken = jwt.sign({id}, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    });
    
    const refreshTokenKey = `refresh_token:${id}`; 

    await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
    });
 
    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });

    return {accessToken, refreshToken};

};

export const verifyrefreshToken = async(refreshToken) => {
try {
    const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const storedtoken = await redisClient.get(`refresh_token:${decode.id}`);

    if(storedtoken === refreshToken){
        return decode;
    }

    return null;

} catch (error) {
    return null;
}
};


export const generateAccessToken = (id, res) => {
    const accessToken = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1m",
    });

     res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
    });
 
};


export const revokeRefreshToken = async(userId) =>{
    await redisClient.del(`refresh_token:${userId}`);
};