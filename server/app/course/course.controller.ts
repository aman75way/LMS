import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createCourseService, getCoursesService, getCourseByIdService, deleteCourseService } from "./course.service";
import { CourseDTO } from "./course.dto";

/**
 * Create a new course (Only instructors).
 */
export const createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== "INSTRUCTOR") {
        res.status(403).json({ message: "Only instructors can create courses" });
        return;
    }

    const { title, description, price, category } = req.body;
    const newCourse: CourseDTO = await createCourseService(req.user.id, title, description, price, category);
    res.status(201).json(newCourse);
});

/**
 * Get all courses.
 */
export const getCourses = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const courses: CourseDTO[] = await getCoursesService();
    res.status(200).json(courses);
});

/**
 * Get a specific course by ID.
 */
export const getCourseById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const course: CourseDTO | null = await getCourseByIdService(id);

    if (!course) {
        res.status(404).json({ message: "Course not found" });
        return
    }

    res.status(200).json(course);
});

/**
 * Delete a course by ID (Only instructor or admin).
 */
export const deleteCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user || (req.user.role !== "INSTRUCTOR" && req.user.role !== "ADMIN")) {
        res.status(403).json({ message: "Unauthorized to delete this course" });
        return;
    }

    await deleteCourseService(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
});
