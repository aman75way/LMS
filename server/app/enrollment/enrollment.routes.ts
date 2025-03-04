import { Router } from "express";
import { enrollUser, getUserEnrollments, getEnrollmentByCourse } from "./enrollment.controller";
import { validateEnrollment } from "./enrollment.validation";
import passport from "../common/services/passport-jwt.service";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validateEnrollment, enrollUser);
router.get("/", passport.authenticate("jwt", { session: false }), getUserEnrollments);
router.get("/:courseId", passport.authenticate("jwt", { session: false }), getEnrollmentByCourse);

export default router;
