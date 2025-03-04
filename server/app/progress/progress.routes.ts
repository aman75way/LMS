import { Router } from "express";
import { markLectureComplete, getUserCourseProgress, getCourseCompletion } from "./progress.controller";
import { validateProgress } from "./progress.validation";
import passport from "../common/services/passport-jwt.service";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validateProgress, markLectureComplete);
router.get("/:courseId", passport.authenticate("jwt", { session: false }), getUserCourseProgress);
router.get("/:courseId/completion", passport.authenticate("jwt", { session: false }), getCourseCompletion);

export default router;
