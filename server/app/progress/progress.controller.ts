import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  markLectureCompleteService,
  getUserCourseProgressService,
  getCourseCompletionService,
} from "./progress.service";
import { ProgressDTO } from "./progress.dto";

/**
 * Mark a lecture as completed.
 */
export const markLectureComplete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) { res.status(401).json({ message: "Unauthorized" });
  return
  };

  const { courseId, lectureId } = req.body;
  const progress: ProgressDTO = await markLectureCompleteService(req.user.id, courseId, lectureId);
  res.status(200).json(progress);
});

/**
 * Get user's progress for a specific course.
 */
export const getUserCourseProgress = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
     res.status(401).json({ message: "Unauthorized" });
     return
  }

  const { courseId } = req.params;
  const progress: ProgressDTO[] = await getUserCourseProgressService(req.user.id, courseId);
  res.status(200).json(progress);
});

/**
 * Get course completion percentage for a user.
 */
export const getCourseCompletion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
     res.status(401).json({ message: "Unauthorized" });
     return
  }

  const { courseId } = req.params;
  const completionPercentage: number = await getCourseCompletionService(req.user.id, courseId);
  res.status(200).json({ completion: `${completionPercentage.toFixed(2)}%` });
});
