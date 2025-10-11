import { cookieConfig } from "../config/cookie.config.js";
import { getUser, userCreate } from "../dao/user.dao.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { createToken } from "../utils/token.js";
export const login = async (req, res) => {

    try {
        const user = await loginUser(req.body);
        const token = createToken({ id: user._id, email: user.email });
        res.cookie('URL_SHORTNER_CK1', token, cookieConfig); // 5 minutes
        return res.status(200).send({ message: "login successful", user: user });
    }
    catch (err) {
        return res.status(err.statusCode || 500).send({ message: err.message || "internal server error" });
    }

}
export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        const token = createToken({ id: user._id, email: user.email });
        res.cookie('URL_SHORTNER_CK1', token, cookieConfig); // 5 minutes
        return res.status(201).send({ message: "user registered successfully", user: user });

    } catch (err) {
        return res.status(err.statusCode || 500).send({ message: err.message || "internal server error" });
    }



}   