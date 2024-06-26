import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import mongoose from "mongoose";

// Login user
// http://localhost:4000/api/admin/login
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const admin = await adminModel.findOne({email});

        if(!admin) {
            return res.json({success: false, message: "admin doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if(!isMatch) {
            return  res.json({success: false, message: "Incorrect credentials"})
        }

        const token = createToken(admin._id);
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Register user
// http://localhost:4000/api/admin/register
const registerUser = async (req, res) => {
    const {name, password, email, city} = req.body;
    try {
        //checking is user is already available
        const exist = await adminModel.findOne({email});
        if(exist) {
            return res.json({success: false, message: "admin already exists"})
        }

        //validating email format and password strength
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin= new adminModel({
            name:name,
            email:email,
            password:hashedPassword,
            city: city
        })

        const admin = await newAdmin.save()
        const token = createToken(admin._id)
        res.json({success:true, token})

    } catch(error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// get admin name

const adminName = async (req, res) => {
    try {
        // Log the request body for debugging
        // console.log('Request body:', req.body);

        // Extract userId from the request body
        const { userId } = req.body;

        // Ensure userId is present
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId format" });
        }

        // Perform the database query using _id
        const admin = await adminModel.findOne({ _id: userId });

        if (!admin) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return only the name
        return res.json({ success: true, data: { name: admin.name } });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getAdmin = async (req, res) => {
    try {
        const { adminId } = req.body;
        console.log(req.body);

        // Ensure userId is present
        if (!adminId) {
            return res.status(400).json({ success: false, message: "adminId is required" });
        }

        if (!mongoose.isValidObjectId(adminId)) {
            return res.status(400).json({ success: false, message: "Invalid adminId format" });
        }

        // Perform the database query using _id
        const admin = await adminModel.findOne({ _id: adminId });

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        return res.json({ success: true, data: admin });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Get all admins
// http://localhost:4000/api/admin/admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find();

        if (!admins || admins.length === 0) {
            return res.status(404).json({ success: false, message: "No admins found" });
        }

        // Return the list of admins
        res.json({ success: true, data: admins });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving admins" });
    }
}

export {loginUser, registerUser,adminName, getAdmin, getAllAdmins}