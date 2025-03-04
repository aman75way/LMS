import prisma from "../common/services/database.service";
import { PurchaseDTO } from "./purchase.dto";

/**
 * Processes a course purchase.
 */
export const purchaseCourseService = async (userId: string, courseId: string, amount: number): Promise<PurchaseDTO> => {
  // Check if the user has already purchased the course
  const existingPurchase = await prisma.purchase.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  if (existingPurchase) {
    throw new Error("You have already purchased this course");
  }

  // Create purchase record
  const purchase = await prisma.purchase.create({
    data: { userId, courseId, amount },
  });

  // Check if user is already enrolled before enrolling
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  if (!existingEnrollment) {
    // Only enroll if the user isn't already enrolled
    await prisma.enrollment.create({
      data: { userId, courseId, progress: 0 },
    });
  }

  return {
    id: purchase.id,
    userId: purchase.userId,
    courseId: purchase.courseId,
    amount: purchase.amount,
    createdAt: purchase.createdAt.toISOString(),
  };
};
/**
 * Retrieves all purchases for a user.
 */
export const getUserPurchasesService = async (userId: string): Promise<PurchaseDTO[]> => {
  const purchases = await prisma.purchase.findMany({ where: { userId } });

  return purchases.map((purchase) => ({
    id: purchase.id,
    userId: purchase.userId,
    courseId: purchase.courseId,
    amount: purchase.amount,
    createdAt: purchase.createdAt.toISOString(),
  }));
};

/**
 * Retrieves a specific purchase by ID.
 */
export const getPurchaseByIdService = async (purchaseId: string): Promise<PurchaseDTO | null> => {
  const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });

  if (!purchase) return null;

  return {
    id: purchase.id,
    userId: purchase.userId,
    courseId: purchase.courseId,
    amount: purchase.amount,
    createdAt: purchase.createdAt.toISOString(),
  };
};
