import axios from "axios"
import adminModel from "../models/adminModel.js";

const calculateDistance = async (req, res) => {

    const { userId } = req.body;
    const admin = await adminModel.findOne({ _id: userId });
    const userCity = admin.city;

    console.log(userCity);

    const { farmerCity, orderCity } = req.body;

    // console.log(farmerCity, orderCity);

    const apiKey = 'AIzaSyD_MPVruX94wvxD8Rqah_IgKf790OPPaW4';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${farmerCity}&destinations=${orderCity}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response);
        const distance = response.data.rows[0].elements[0].distance.value / 1000; // distance in kilometers
        const deliveryFee = calculateDeliveryFee(distance);
        res.json({success: true, data: { distance, deliveryFee }});
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate distance' });
    } 
}

const calculateDeliveryFee = (distance) => {
    const feePerKm = 1.5; // Example fee rate
    return distance * feePerKm;
};

export {calculateDistance}