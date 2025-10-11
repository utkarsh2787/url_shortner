import { getUser } from "../dao/user.dao.js";
import { verifyToken } from "../utils/token.js";

export const authMiddleware = (req, res, next) => {
    // Example: Check for a token in headers
    const token = req.cookies['URL_SHORTNER_CK1'];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).send({ message: "Invalid token" });
        }
        const userid = getUser({ email: decoded.email });
        if (!userid) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.user = decoded; // attach user info to request

        next();
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized" });
    }
}


export const optionalAuthMiddleware = (req, res, next) => {
    // Example: Check for a token in headers
    console.log({ abc: 10 })
    const token = req.cookies['URL_SHORTNER_CK1'];
    if (!token) {
        next()
        return;
    }
    try {
        const decoded = verifyToken(token);
        // console.log({ decoded })
        if (!decoded) {
            next()
            return;
        }
        const userid = getUser({ email: decoded.email });
        if (!userid) {
            next()
            return;
        }
        req.user = decoded;
        console.log({ user: req.user })

        next();
    } catch (err) {
        console.log(err)
        next()
    }
}
