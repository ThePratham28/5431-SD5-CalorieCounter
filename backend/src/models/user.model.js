import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // Hashed password
        savedDishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }], // Array of user's saved dishes
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const user = model("User", UserSchema);

export default user;
