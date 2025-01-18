import { Schema, model } from "mongoose";

const IngredientSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }, 
    calories: { type: Number, required: true }, 
});

const DishSchema = new Schema(
    {
        name: { type: String, required: true },
        ingredients: [IngredientSchema], 
    },
    { timestamps: true } 
);

const dish = model("Dish", DishSchema);

export default dish;