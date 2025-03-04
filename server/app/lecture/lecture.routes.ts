import { Router } from "express";
import { createLecture, getLecturesByCourse, getLectureById, deleteLecture } from "./lecture.controller";
import { validateLecture } from "./lecture.validation";
import passport from "../common/services/passport-jwt.service";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validateLecture, createLecture);
router.get("/:courseId", getLecturesByCourse);
router.get("/single/:id", getLectureById);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteLecture);

export default router;
