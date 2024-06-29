import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { addItem, getItem, searchItems, updateItem } from "../controllers/itemController.js";


const itemRouter = express.Router();

//http://localhost:4000/api/item/
itemRouter.post("/add-item", authMiddleWare, addItem);
itemRouter.post("/get-item", getItem);
itemRouter.post("/update-item", authMiddleWare, updateItem);
itemRouter.post("/search", searchItems)

export default itemRouter;


