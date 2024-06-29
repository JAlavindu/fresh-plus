import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import mongoose from "mongoose";

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success: false, message: "User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return  res.json({success: false, message: "Incorrect credentials"})
        }

        const token = createToken(user._id);
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
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        //checking is user is already available
        const exist = await userModel.findOne({email});
        if(exist) {
            return res.json({success: false, message: "User already exists"})
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

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch(error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

const updateUser = async (req, res) => {
    const { userId, name, email, password } = req.body;
    try {
        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the new email is already in use by another user
        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
        }

        // Validate email format
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        // Validate password strength
        if (password && password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a strong password" });
        }

        // Hash the new password if provided
        let hashedPassword;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        // Update user details
        const updatedData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(password && { password: hashedPassword }),
        };

        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });

        return res.status(200).json({ success: true, message: "User updated", data: updatedUser });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getUser = async (req, res) => {
    try {
        const { userId } = req.body;
        // console.log(req.body);

        // Ensure userId is present
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId format" });
        }

        // Perform the database query using _id
        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        return res.json({ success: true, data: {name: user.name, email: user.email} });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const comparePassword = async (req, res) => {
    try {
        const { userId, password } = req.body;
        // console.log(req.body);

        // Ensure userId and password are present
        if (!userId || !password) {
            return res.status(400).json({ success: false, message: "userId and password are required" });
        }

        // Validate userId format
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId format" });
        }

        // Perform the database query using _id
        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare the plaintext password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Password is incorrect" });
        }

        return res.json({ success: true, message: "Password is correct" });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const userName = async (req, res) => {
    try {
        // Log the request body for debugging
        // console.log('Request body:', req.body);

        // Extract userId from the request body
        const { userId } = req.body;

        // Ensure userId is present
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        // Log the extracted userId
        console.log('Extracted userId:', userId);

        // Check if userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId format" });
        }

        // Perform the database query using _id
        const user = await userModel.findOne({ _id: userId });

        // Log the query result
        console.log('Query result:', user);

        // Handle case when user is not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return only the name
        return res.json({ success: true, data: { name: user.name } });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export {loginUser, registerUser, updateUser, getUser, comparePassword, userName}