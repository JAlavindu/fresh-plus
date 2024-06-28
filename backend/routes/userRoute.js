import express from "express"
import { comparePassword, getUser, loginUser, registerUser, updateUser, userName } from "../controllers/userController.js"
import authMiddleWare from "../middleware/auth.js"

const userRouter = express.Router()

// //http://localhost:4000/api/user/login
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/update-user", authMiddleWare, updateUser)

userRouter.post("/getUser", authMiddleWare, getUser)
userRouter.post("/compare-pwd", authMiddleWare, comparePassword)
userRouter.post("/name", authMiddleWare, userName)

export default userRouter