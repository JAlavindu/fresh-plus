import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { addItem, searchItems } from "../controllers/itemController.js";


const itemRouter = express.Router();

itemRouter.post("/add-item", authMiddleWare, addItem);
itemRouter.post("/search", searchItems)

export default itemRouter;


