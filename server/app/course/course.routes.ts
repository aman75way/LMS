import { Router } from "express";
import { createCourse, getCourses, getCourseById, deleteCourse } from "./course.controller";
import { validateCourse } from "./course.validation";
import passport from "../common/services/passport-jwt.service";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validateCourse, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteCourse);

export default router;
