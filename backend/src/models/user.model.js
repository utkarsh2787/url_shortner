import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default:"gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    }
   
});
const User = mongoose.model("User", userSchema);
export default User;