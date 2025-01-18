import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Set token in HTTP-only cookie
    res.cookie("jwt", token, {
        httpOnly: true, // Prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;
