import prisma from "../common/services/database.service";
import { EnrollmentDTO } from "./enrollment.dto";

/**
 * Enroll a user in a course.
 */
export const enrollUserService = async (userId: string, courseId: string): Promise<EnrollmentDTO> => {
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  if (existingEnrollment) {
    throw new Error("User is already enrolled in this course");
  }

  const enrollment = await prisma.enrollment.create({
    data: { userId, courseId, progress: 0 },
  });

  return {
    id: enrollment.id,
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    progress: enrollment.progress,
    createdAt: enrollment.createdAt.toISOString(),
  };
};

/**
 * Get all enrolled courses for a user.
 */
export const getUserEnrollmentsService = async (userId: string): Promise<EnrollmentDTO[]> => {
  const enrollments = await prisma.enrollment.findMany({ where: { userId } });

  return enrollments.map((enrollment) => ({
    id: enrollment.id,
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    progress: enrollment.progress,
    createdAt: enrollment.createdAt.toISOString(),
  }));
};

/**
 * Get a specific enrollment by user & course ID.
 */
export const getEnrollmentByCourseService = async (userId: string, courseId: string): Promise<EnrollmentDTO | null> => {
  const enrollment = await prisma.enrollment.findUnique({ where: { userId_courseId: { userId, courseId } } });

  if (!enrollment) return null;

  return {
    id: enrollment.id,
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    progress: enrollment.progress,
    createdAt: enrollment.createdAt.toISOString(),
  };
};
