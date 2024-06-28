import mongoose from "mongoose"

const subscriptionSchema = new mongoose.Schema({
    adminId: {type: String, required: true},
    adminName: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    validity: {type: Number, required: true},
    date: {type: Date, default: Date.now()},
    users: {type: Object, default:{}}
    // payment: {type: Boolean, default: false},
})

const subscriptionModel = mongoose.models.subscription || mongoose.model("subscription", subscriptionSchema)

export default subscriptionModel;