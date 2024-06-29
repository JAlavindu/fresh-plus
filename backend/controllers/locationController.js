import axios from "axios"
import adminModel from "../models/adminModel.js";
import orderModel from "../models/orderModel.js"

const calculateDistance = async (req, res) => {

    const { userId, orderId } = req.body;
    // console.log(orderId);

    const admin = await adminModel.findOne({ _id: userId });
    const order = await orderModel.findOne({ _id: orderId });

    if (!admin) {
        console.log("no admin");
        return res.status(404).json({ error: "Admin not found" });
    }
    if (!order) {
        console.log("no order");
        return res.status(404).json({ error: "Order not found" });
    }

    const adminCity = admin.city;
    const orderCity = order.address.city;
    // console.log(orderCity);

    const apiKey = 'AIzaSyD_MPVruX94wvxD8Rqah_IgKf790OPPaW4';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${adminCity}&destinations=${orderCity}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response);
        const distance = response.data.rows[0].elements[0].distance.value / 1000; // distance in kilometers
        const deliveryFee = calculateDeliveryFee(distance);
        res.json({success: true, data: { distance, deliveryFee, order, adminCity, orderCity }});
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate distance' });
    } 
}

const calculateDeliveryFee = (distance) => {
    const feePerKm = 40; // Example fee rate
    return distance * feePerKm;
};

export {calculateDistance}