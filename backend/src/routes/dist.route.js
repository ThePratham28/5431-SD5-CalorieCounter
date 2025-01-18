import { Router } from "express";
import {
    getDishes,
    getDish,
    createDish,
    updateDish,
    deleteDish,
} from "../controllers/dish.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const dishRoutes = Router();

dishRoutes.get("/", getDishes);
dishRoutes.get("/:id", getDish);
dishRoutes.post("/", authMiddleware, createDish);
dishRoutes.put("/:id", authMiddleware, updateDish);
dishRoutes.delete("/:id", authMiddleware, deleteDish);

export default dishRoutes;
