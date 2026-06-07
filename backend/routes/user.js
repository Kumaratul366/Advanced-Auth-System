import express from 'express';
import { adminController, loginUser, logOutUser, myProfile, refreshToken, registerUser, verifyOtp, verifyUser } from '../controllers/user.js';
import { authorisedAdmis, isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.get("/me", isAuth, myProfile);
router.post("/refresh", refreshToken);
router.post("/logout", isAuth, logOutUser);
router.get("/admin", isAuth, authorisedAdmis, adminController);

export default router;