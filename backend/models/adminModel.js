import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    products: {type: Object, default:{}},
    subscriptions: {type: Object, default:{}},
}, {minimize:false})

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default adminModel;