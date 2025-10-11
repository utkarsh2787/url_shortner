import AppError from "../utils/errorHandler.js";
import User from "../models/user.model.js";

export const userCreate = async (userData) => {
    // Logic to save user to the database
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (err) {
        throw new AppError('Error creating user: ' + err.message, 403);
    }
}

export const getUser = async (userData) => {
    // Logic to save user to the database
    try {
        const newUser = await User.findOne({ email: userData.email });
        
        return newUser;
    } catch (err) {
       
        throw new AppError('Error finding user: ' + err.message, 500);
    }
}


