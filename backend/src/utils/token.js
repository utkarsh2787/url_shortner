import jsonwebtoken from "jsonwebtoken";

export const createToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });
}

export const verifyToken = (token) => {
    try {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null; // Invalid token
    }
}