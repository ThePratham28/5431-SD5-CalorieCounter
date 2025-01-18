import { Router } from "express";
import { login, logoutUser, profile, register, saveDish, unsaveDish } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logoutUser);

userRouter.get("/profile", authMiddleware, profile);

userRouter.post("/save-dish/:dishId", authMiddleware, saveDish);
userRouter.delete("/save-dish/:dishId", authMiddleware, unsaveDish);


export default userRouter;
