import dish from "../models/dish.model.js";

const getDishes = async (req, res, next) => {
    try {
        const dishes = await dish.find()
        res.status(200).json(dishes);
    } catch (error) {
        next(error);
    }
};

const getDish = async (req, res, next) => {
    const { id } = req.params;
    try {
        const dish = await dish.findById(id);
        res.status(200).json(dish);
    } catch (error) {
        next(error);
    }
};

const createDish = async (req, res, next) => {
    try {
        const { name, ingredients, qrCodeData } = req.body;

        const dish = new dish({
            name,
            ingredients,
            qrCodeData,
            createdBy: req.user.id, // Assuming req.user is set after authentication
        });

        const savedDish = await dish.save();
        res.status(201).json(savedDish);
    } catch (error) {
        next(error);
    }
};

const updateDish = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedDish = await dish.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updatedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(updatedDish);
    } catch (error) {
        next(error);
    }
};

const deleteDish = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedDish = await dish.findByIdAndDelete(id);
        if (!deletedDish)
            return res.status(404).json({ message: "Dish not found" });

        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getDishes, getDish, createDish, updateDish, deleteDish };
