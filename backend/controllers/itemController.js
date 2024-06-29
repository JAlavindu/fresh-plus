import itemModel from "../models/itemModel.js";
import adminModel from "../models/adminModel.js"
import fs from 'fs'
import { log } from "console";

// add a new item
// http://localhost:4000/api/admin/add-item
const addItem = async (req, res) => {

    try {
        // console.log("Request Body:", req.body);
        // console.log("Uploaded File:", req.file);
        // Create a new item based on the request body
        const admin = await adminModel.findById(req.body.userId);
        const adminName = admin.name;

        const newItem = new itemModel({
            adminId: req.body.userId,
            adminName: adminName,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            amount: req.body.amount,
        });

        // Save the new item to the database
        const savedItem = await newItem.save();

        // Update the admin's products field with the new item
        if (admin) {
            admin.products = {
                ...admin.products,
                [savedItem._id]: {
                    name: savedItem.name,
                    amount: savedItem.amount,
                    price: savedItem.price,
                    category: savedItem.category,
                    date: savedItem.date,
                    image: savedItem.image
                }
            };

            // Save the updated admin document
            await admin.save();
        }

        // Respond with success message
        res.json({ success: true, message: "Product added!" });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }

}

// get admin items
// http://localhost:4000/api/admin/get-items
const getItems = async (req, res) => {
    try {
        const admin = await adminModel.findById(req.body.userId);
        console.log(req.body);

        if (admin) {
            res.json({ success: true, data: admin.products });
        } else {
            res.json({ success: false, message: "Admin not found" });
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// remove a item from admin
// http://localhost:4000/api/admin/remove-item
const removeItem = async (req, res) => {
    try {
      // Find the item by ID
      const item = await itemModel.findById(req.body.id);
      if (!item) {
        return res.json({ success: false, message: "Item not found" });
      }
  
      // Find the admin by userId
      const admin = await adminModel.findById(req.body.userId);
      if (!admin) {
        return res.json({ success: false, message: "Admin not found" });
      }
  
      // Remove the item's image file
      if (item.image) {
        fs.unlink(`uploads/${item.image}`, (err) => {
          if (err) {
            console.log(`Error deleting image file: ${err}`);
          }
        });
      }
  
      // Delete the item from the items collection
      await itemModel.findByIdAndDelete(req.body.id);

      // Remove the item from the admin's products field
        const { [item._id]: removedItem, ...updatedProducts } = admin.products;
        admin.products = updatedProducts;
        await admin.save();
  
      // Respond with success message
      res.json({ success: true, message: "Item Removed" });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };


  // get items by admin id
  const getIemsByAdminId = async(req, res) => {
    try {
      const items = await itemModel.find({ adminId: req.params.adminId });
      res.json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching items by adminId:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  const getAllItems = async (req, res) => {
    try {
      const items = await itemModel.find();
      res.json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching all items:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

  // Search item by name
  const searchItems = async (req, res) => {
    try {
      const { name, vegetable, fruit } = req.body;
      console.log(req.body);
      let filter = {};
  
      // If name is provided, add it to the filter using a case-insensitive regex
      if (name) {
        const nameRegex = new RegExp(`^${name}$`, 'i');
        filter.name = nameRegex;
      }
  
      // If vegetable or fruit is true, add category to the filter
      if (vegetable || fruit) {
        filter.category = { $in: [] };
        if (vegetable) {
          filter.category.$in.push('Vegetable');
        }
        if (fruit) {
          filter.category.$in.push('Fruit');
        }
      }
  
      const items = await itemModel.find(filter);
      res.json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching items by name:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  


export {addItem, getItems ,removeItem, getIemsByAdminId, getAllItems, searchItems}