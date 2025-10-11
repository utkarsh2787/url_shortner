import { getUser, userCreate } from "../dao/user.dao.js";
import AppError from "../utils/errorHandler.js";

export const registerUser = async (userData) => {

    const { email, password, username } = userData;
    if (!email || !password || !username) {
        throw new AppError("email and password are required", 400);
    }
    // Logic to save user to the database
    try {
        const newUser = await getUser({ email: email });
        if (newUser) {
            throw new AppError('User already exists', 403);
        }
        else {
            const newUser = await userCreate({ name: username, password, email, ...userData.avatar ? { avatar: userData.avatar } : {} });
            return newUser;
        }
    } catch (err) {
        console.log(err);
        if (err instanceof AppError) {
            // already a handled app error → rethrow as is
            throw err;
        }
        else {
            // unexpected DB or logic error
            throw new AppError('Error creating user: ' + err.message, 500);
        }
    }
}

export const loginUser = async (userData) => {
    const { email, password } = userData;
    if (!email || !password) {
        throw new AppError("email and password are required", 400);
    }
    try {
        const user = await getUser({ email });
        if (!user) {
            throw new AppError('User not found', 404);
        }
        if (user.password != password) {
            throw new AppError('Invalid password', 403);
        }
        return user;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        else {
            throw new AppError('Error logging in user: ' + err.message, 500);
        }
    }
}