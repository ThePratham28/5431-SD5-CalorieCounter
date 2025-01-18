import jwt from "jsonwebtoken";
import user from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.jwt) {
        try {
            token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await user.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default authMiddleware;
