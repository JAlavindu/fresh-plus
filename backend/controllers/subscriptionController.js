import subscriptionModel from "../models/subscriptionModel.js";
import adminModel from "../models/adminModel.js";
import Stripe from "stripe";
import fs from "fs";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const addSubscription = async (req, res) => {
  const admin = await adminModel.findById(req.body.userId);

  try {
    // console.log(admin.name);
    const newSubscription = new subscriptionModel({
      adminId: req.body.userId,
      adminName: admin.name,
      name: req.body.name,
      description: req.body.description,
      validity: req.body.validity,
      validityDescription: req.body.validityDescription,
      price: req.body.price,
    });

    // Save the new item to the database
    const savedItem = await newSubscription.save();
    console.log(savedItem);

    // Update the admin's products field with the new item
    console.log(admin);
    if (admin) {
      admin.subscriptions = {
        ...admin.subscriptions,
        [savedItem._id]: {
          name: savedItem.name,
          description: savedItem.description,
          validity: savedItem.validity,
          validityDescription: savedItem.validityDescription,
          price: savedItem.price,
        },
      };

      // Save the updated admin document
      await admin.save();
    }

    // Respond with success message
    res.json({ success: true, message: "Subscription added!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createSubscription = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // const newSubscription = new subscriptionModel({
    //   userId: req.body.userId,
    //   items: req.body.items,
    //   amount: req.body.amount,
    // });

    // await newSubscription.save();
    // console.log(req.body);
    // const userId = req.body.userId;
    // const newSubscriptionId = req.body.subscriptionId;
    const { subscriptionId, userId, amount, name } = req.body;

    const line_items = [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: name,
          },
          unit_amount: amount * 100, // Amount in cents (assuming amount is in AUD)
        },
        quantity: 1, // Assuming single unit for simplicity
      },
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: 20000, // Assuming delivery charge is 200 AUD cents
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verifySubscription?success=true&subscriptionId=${subscriptionId}&user=${userId}`,
      cancel_url: `${frontend_url}/verifySubscription?success=false&subscriptionId=${subscriptionId}&user=${userId}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error creating subscription" });
  }
};

const verifySubscription = async (req, res) => {
  const { subscriptionId: subscriptionId, userId: userId, success } = req.body;
  console.log(req.body);

  try {
    if (success == "true") {
      await subscriptionModel.findByIdAndUpdate(subscriptionId, {
        $addToSet: { users: userId },
      });
      res.json({ success: true, message: "Paid" });
    } else {
      await subscriptionModel.findByIdAndDelete(subscriptionId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userSubscriptions = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Find subscriptions where userId is included in the users array
    const subscriptions = await subscriptionModel.find({
      users: { $in: [userId] },
    });

    res.json({ success: true, data: subscriptions });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching user subscriptions" });
  }
};

const removeUserSubscription = async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;

    // Find the subscription by its _id and ensure userId is in the users array
    const subscription = await subscriptionModel.findOneAndUpdate(
      { _id: subscriptionId, users: { $in: [userId] } },
      { $pull: { users: userId } },
      { new: true }
    );

    if (!subscription) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Subscription not found or user is not enrolled",
        });
    }

    res.json({
      success: true,
      message: "User removed from subscription",
      data: subscription,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error removing user from subscription",
      });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionModel.find();

    if (!subscriptions || subscriptions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No subscriptions found" });
    }

    // Return the list of admins
    res.json({ success: true, data: subscriptions });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving subscriptions" });
  }
};

const adminSubscriptions = async (req, res) => {
  try {
    const adminId = req.body.userId;
    console.log(adminId);

    // Find subscriptions where userId is included in the users array
    const subscriptions = await subscriptionModel.find({
      adminId
    });

    res.json({ success: true, data: subscriptions });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching user subscriptions" });
  }
};

const removeAdminSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    console.log("sub id", subscriptionId);

    // Find and remove the subscription by its _id
    const subscription = await subscriptionModel.findByIdAndDelete(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.json({ success: true, message: "Subscription removed successfully", data: subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing subscription" });
  }
};


export {createSubscription, verifySubscription, userSubscriptions, removeUserSubscription, addSubscription, getAllSubscriptions, adminSubscriptions, removeAdminSubscription}
