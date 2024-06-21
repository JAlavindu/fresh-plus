import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { addItem } from "../controllers/itemController.js";


const itemRouter = express.Router();

itemRouter.post("/add-item", authMiddleWare, addItem);

export default itemRouter;


