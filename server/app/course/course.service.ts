import prisma from "../common/services/database.service";
import { CourseDTO } from "./course.dto";

/**
 * Creates a new course.
 */
export const createCourseService = async (
  instructorId: string,
  title: string,
  description: string,
  price: number,
  category: string
): Promise<CourseDTO> => {
  const course = await prisma.course.create({
    data: { instructorId, title, description, price, category },
  });

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    category: course.category,
    instructorId: course.instructorId,
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  };
};

/**
 * Retrieves all courses.
 */
export const getCoursesService = async (): Promise<CourseDTO[]> => {
  const courses = await prisma.course.findMany();

  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    category: course.category,
    instructorId: course.instructorId,
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  }));
};

/**
 * Retrieves a specific course by ID.
 */
export const getCourseByIdService = async (courseId: string): Promise<CourseDTO | null> => {
  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) return null;

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    category: course.category,
    instructorId: course.instructorId,
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  };
};

/**
 * Deletes a course by ID (Only the instructor or admin can delete).
 */
export const deleteCourseService = async (courseId: string): Promise<void> => {
  await prisma.course.delete({ where: { id: courseId } });
};
