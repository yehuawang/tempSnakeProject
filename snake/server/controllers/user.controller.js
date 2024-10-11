import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
};

export const createUser = async (req, res) => {
  const user = req.body; // user sent this data

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  const newUser = new User(user);

  try{
    await newUser.save();
    res.status(201).json({ 
      success: true, 
      data: newUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid user ID"
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid user ID"
    });
  }
  try{
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User is successfullydeleted"
    });
  }catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};