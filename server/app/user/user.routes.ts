import { Router } from "express";
import { signup, login, logout, getUser, refreshAccessToken } from "./user.controller";
import { validateUserSignup, validateUserLogin } from "./user.validation";
import passport from "../common/services/passport-jwt.service";
import { authLimiter } from "../common/services/rate-limiter.service"; // Import the rate limiter

const router = Router();

router.post("/signup", authLimiter, validateUserSignup, signup);
router.post("/login", authLimiter, validateUserLogin, login);
router.post("/logout", passport.authenticate("jwt", { session: false }), logout);
router.get("/", passport.authenticate("jwt", { session: false }), getUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
