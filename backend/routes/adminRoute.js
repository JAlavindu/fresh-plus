import express from "express"
import { adminName, getAllAdmins, loginUser, registerUser } from "../controllers/adminController.js"
import authMiddleWare from "../middleware/auth.js"
import { addItem, getAllItems, getIemsByAdminId, getItems, removeItem } from "../controllers/itemController.js"
import multer from "multer";

const adminRouter = express.Router()

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

// http://localhost:4000/api/admin/
adminRouter.post("/register", registerUser)
adminRouter.post("/login", loginUser)
adminRouter.get("/name", authMiddleWare, adminName)
adminRouter.get("/admins", getAllAdmins)

adminRouter.post("/add-item", upload.single("image"), authMiddleWare, addItem)
adminRouter.post("/get-items", authMiddleWare, getItems)
adminRouter.post("/remove-item", authMiddleWare, removeItem)
adminRouter.get("/get-items/:adminId", getIemsByAdminId)
adminRouter.get("/getAll", getAllItems)

export default adminRouter