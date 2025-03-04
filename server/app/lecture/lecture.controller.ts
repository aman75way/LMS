import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createLectureService,
  getLecturesByCourseService,
  getLectureByIdService,
  deleteLectureService,
} from "./lecture.service";
import { LectureDTO } from "./lecture.dto";

/**
 * Create a new lecture (Only instructors).
 */
export const createLecture = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user || req.user.role !== "INSTRUCTOR") {
    res.status(403).json({ message: "Only instructors can create lectures" });
    return ;
  }

  const { courseId, title, contentUrl, duration } = req.body;
  const newLecture: LectureDTO = await createLectureService(req.user.id, courseId, title, contentUrl, duration);
  res.status(201).json(newLecture);
});

/**
 * Get all lectures for a course.
 */
export const getLecturesByCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;

  const lectures: LectureDTO[] = await getLecturesByCourseService(courseId);
  res.status(200).json(lectures);
});

/**
 * Get a specific lecture by ID.
 */
export const getLectureById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const lecture: LectureDTO | null = await getLectureByIdService(id);
  if (!lecture) { res.status(404).json({ message: "Lecture not found" });
  return
}

  res.status(200).json(lecture);
});

/**
 * Delete a lecture by ID (Only instructor or admin).
 */
export const deleteLecture = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user || (req.user.role !== "INSTRUCTOR" && req.user.role !== "ADMIN")) {
    res.status(403).json({ message: "Unauthorized to delete this lecture" });
    return ;
  }

  await deleteLectureService(req.params.id, req.user.id);
  res.status(200).json({ message: "Lecture deleted successfully" });
});
