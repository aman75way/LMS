import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { enrollUserService, getUserEnrollmentsService, getEnrollmentByCourseService } from "./enrollment.service";
import { EnrollmentDTO } from "./enrollment.dto";

/**
 * Enroll a user in a course.
 */
export const enrollUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    const { courseId } = req.body;
    const enrollment: EnrollmentDTO = await enrollUserService(req.user.id, courseId);
    res.status(201).json(enrollment);
});

/**
 * Get all enrolled courses for the logged-in user.
 */
export const getUserEnrollments = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    const enrollments: EnrollmentDTO[] = await getUserEnrollmentsService(req.user.id);
    res.status(200).json(enrollments);
});

/**
 * Get a specific enrollment by course ID.
 */
export const getEnrollmentByCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    const { courseId } = req.params;
    const enrollment: EnrollmentDTO | null = await getEnrollmentByCourseService(req.user.id, courseId);
    if (!enrollment) {
        res.status(404).json({ message: "Enrollment not found" });
        return
    }

    res.status(200).json(enrollment);
});
