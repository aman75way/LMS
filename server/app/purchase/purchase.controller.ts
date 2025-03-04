import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { purchaseCourseService, getUserPurchasesService, getPurchaseByIdService } from "./purchase.service";
import { PurchaseDTO } from "./purchase.dto";

/**
 * Create a new course purchase.
 */
export const purchaseCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    const { courseId, amount } = req.body;
    const purchase: PurchaseDTO = await purchaseCourseService(req.user.id, courseId, amount);
    res.status(201).json(purchase);
});

/**
 * Get all purchases for the authenticated user.
 */
export const getUserPurchases = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    const purchases: PurchaseDTO[] = await getUserPurchasesService(req.user.id);
    res.status(200).json(purchases);
});

/**
 * Get a specific purchase by ID.
 */
export const getPurchaseById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const purchase: PurchaseDTO | null = await getPurchaseByIdService(id);
    if (!purchase) {
        res.status(404).json({ message: "Purchase not found" });
        return
    }

    res.status(200).json(purchase);
}); {

}