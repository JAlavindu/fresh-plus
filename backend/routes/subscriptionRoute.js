import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { createSubscription, getAllSubscriptions, removeUserSubscription, userSubscriptions, verifySubscription } from "../controllers/subscriptionController.js";

const subscriptionRouter = express.Router();

// http://localhost:4000/api/subscription/new-subscription
subscriptionRouter.post("/new-subscription", authMiddleWare, createSubscription)
subscriptionRouter.post("/verify-subscription", verifySubscription)
subscriptionRouter.post("/user-subscriptions", authMiddleWare, userSubscriptions);
subscriptionRouter.post("/remove-subscription", authMiddleWare, removeUserSubscription);
subscriptionRouter.get("/get-subscriptions", getAllSubscriptions);

export default subscriptionRouter