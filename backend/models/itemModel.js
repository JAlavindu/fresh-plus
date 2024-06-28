import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    
    adminId: {type: String, required: true},
    adminName: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now()},
})

const itemModel = mongoose.models.item || mongoose.model("item", itemSchema)

export default itemModel;