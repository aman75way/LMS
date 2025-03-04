import { Router } from "express";
import userRoutes from "../app/user/user.routes";
import courseRoutes from "../app/course/course.routes";
import lectureRoutes from "../app/lecture/lecture.routes";
import progressRoutes from "../app/progress/progress.routes";
import enrollmentRoutes from "../app/enrollment/enrollment.routes";
import purchaseRoutes from "../app/purchase/purhcase.routes";

const router = Router();

// Register all entity-specific routes
router.use("/auth", userRoutes);
router.use("/courses", courseRoutes);
router.use("/lectures", lectureRoutes);
router.use("/progress", progressRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/purchases", purchaseRoutes);

export default router;
