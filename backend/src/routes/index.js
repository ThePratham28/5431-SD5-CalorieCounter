import express from "express";
import dishRoutes from "./dist.route.js";
import userRouter from "./user.route.js";

const router = express.Router();

router.use("/dishes", dishRoutes);
router.use("/users", userRouter);

export default router;