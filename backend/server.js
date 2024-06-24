import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import adminRouter from "./routes/adminRoute.js"
import subscriptionRouter from "./routes/subscriptionRoute.js"


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB();

// API endpoints
app.use("/api/product", productRouter)
app.use("/images", express.static('uploads'))

// user
app.use("/api/user", userRouter)

//admin
app.use("/api/admin", adminRouter)



// cart
app.use("/api/cart", cartRouter)

//order
app.use("/api/order", orderRouter)

//subscription
app.use("/api/subscription", subscriptionRouter)


app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
