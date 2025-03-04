import prisma from "../common/services/database.service";
import { LectureDTO } from "./lecture.dto";

/**
 * Creates a new lecture for a course.
 */
export const createLectureService = async (
  instructorId: string,
  courseId: string,
  title: string,
  contentUrl: string,
  duration: number
): Promise<LectureDTO> => {
  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) throw new Error("Course not found");
  if (course.instructorId !== instructorId) throw new Error("Unauthorized to add lectures to this course");

  const lecture = await prisma.lecture.create({
    data: { title, contentUrl, duration, courseId },
  });

  return {
    id: lecture.id,
    title: lecture.title,
    contentUrl: lecture.contentUrl,
    duration: lecture.duration,
    courseId: lecture.courseId,
    createdAt: lecture.createdAt.toISOString(),
    updatedAt: lecture.updatedAt.toISOString(),
  };
};

/**
 * Retrieves all lectures for a specific course.
 */
export const getLecturesByCourseService = async (courseId: string): Promise<LectureDTO[]> => {
  const lectures = await prisma.lecture.findMany({ where: { courseId } });

  return lectures.map((lecture) => ({
    id: lecture.id,
    title: lecture.title,
    contentUrl: lecture.contentUrl,
    duration: lecture.duration,
    courseId: lecture.courseId,
    createdAt: lecture.createdAt.toISOString(),
    updatedAt: lecture.updatedAt.toISOString(),
  }));
};

/**
 * Retrieves a specific lecture by ID.
 */
export const getLectureByIdService = async (lectureId: string): Promise<LectureDTO | null> => {
  const lecture = await prisma.lecture.findUnique({ where: { id: lectureId } });

  if (!lecture) return null;

  return {
    id: lecture.id,
    title: lecture.title,
    contentUrl: lecture.contentUrl,
    duration: lecture.duration,
    courseId: lecture.courseId,
    createdAt: lecture.createdAt.toISOString(),
    updatedAt: lecture.updatedAt.toISOString(),
  };
};

/**
 * Deletes a lecture by ID (Only instructor or admin).
 */
export const deleteLectureService = async (lectureId: string, instructorId: string): Promise<void> => {
  const lecture = await prisma.lecture.findUnique({ where: { id: lectureId } });

  if (!lecture) throw new Error("Lecture not found");

  const course = await prisma.course.findUnique({ where: { id: lecture.courseId } });
  if (!course || course.instructorId !== instructorId) throw new Error("Unauthorized to delete this lecture");

  await prisma.lecture.delete({ where: { id: lectureId } });
};
