import prisma from "../common/services/database.service";
import { ProgressDTO } from "./progress.dto";

/**
 * Marks a lecture as completed by the user.
 */
export const markLectureCompleteService = async (
  userId: string,
  courseId: string,
  lectureId: string
): Promise<ProgressDTO> => {
  const progress = await prisma.progress.upsert({
    where: { userId_lectureId: { userId, lectureId } },
    update: { completed: true },
    create: { userId, courseId, lectureId, completed: true },
  });

  return {
    id: progress.id,
    userId: progress.userId,
    courseId: progress.courseId,
    lectureId: progress.lectureId,
    completed: progress.completed,
    createdAt: progress.createdAt.toISOString(),
  };
};

/**
 * Retrieves the progress of a user for a specific course.
 */
export const getUserCourseProgressService = async (
  userId: string,
  courseId: string
): Promise<ProgressDTO[]> => {
  const progress = await prisma.progress.findMany({
    where: { userId, courseId },
  });

  return progress.map((entry) => ({
    id: entry.id,
    userId: entry.userId,
    courseId: entry.courseId,
    lectureId: entry.lectureId,
    completed: entry.completed,
    createdAt: entry.createdAt.toISOString(),
  }));
};

/**
 * Gets the completion percentage of a course for a user.
 */
export const getCourseCompletionService = async (userId: string, courseId: string): Promise<number> => {
  const totalLectures = await prisma.lecture.count({ where: { courseId } });
  const completedLectures = await prisma.progress.count({ where: { userId, courseId, completed: true } });

  if (totalLectures === 0) return 0;
  return (completedLectures / totalLectures) * 100;
};
