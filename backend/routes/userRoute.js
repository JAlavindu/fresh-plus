import express from "express"
import { loginUser, registerUser, userName } from "../controllers/userController.js"
import authMiddleWare from "../middleware/auth.js"

const userRouter = express.Router()

// //http://localhost:4000/api/user/login
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/name", authMiddleWare, userName)

export default userRouter