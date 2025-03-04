import { Router } from "express";
import { purchaseCourse, getUserPurchases, getPurchaseById } from "./purchase.controller";
import { validatePurchase } from "./purchase.validation";
import passport from "../common/services/passport-jwt.service";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validatePurchase, purchaseCourse);
router.get("/", passport.authenticate("jwt", { session: false }), getUserPurchases);
router.get("/:id", passport.authenticate("jwt", { session: false }), getPurchaseById);

export default router;
