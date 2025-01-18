import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

// Register a new user
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check if user already exists
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: "User already exists"});

        const user = await User.create({
            name,
            email,
            password,
        });

        if(user) {
            generateToken(res, user._id);
            res.status(201).json({message: "User registered successfully", 
                _id : user._id,
                name : user.name,
                email : user.email,
                savedDishes : user.savedDishes
            });
        }
        else {
            res.status(400).json({message: "Invalid user data"});
        }
    }
    catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

// Login user
export const login = async (req, res) => {

    try {

        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne   ({email});
        
        if(user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            res.status(200).json({message: "User logged in successfully", 
                _id : user._id,
                name : user.name,
                email : user.email,
                savedDishes : user.savedDishes
            });
        }
        else {
            res.status(401).json({message: "Invalid email or password"});
        }
    }catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

// Logout user
export const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), // Set cookie expiration to the past
    });
    res.status(200).json({ message: "Logged out successfully" });
};


// Get user profile
export const profile = async (req, res) => {
    try {
        const userProfile = await User.findById(req.user.id).select("-password").populate("savedDishes");
        if (userProfile) {
            res.status(200).json({
                _id: userProfile._id,
                name: userProfile.name,
                email: userProfile.email,
                savedDishes: userProfile.savedDishes,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

//saving for a user.
export const saveDish = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user.savedDishes.includes(req.params.dishId)) {
            user.savedDishes.push(req.params.dishId);
            await user.save();
        }

        res.status(200).json({ message: "Dish saved successfully" });
    } catch (error) {
        next(error);
    }
};

export const unsaveDish = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        user.savedDishes = user.savedDishes.filter(
            (dishId) => dishId.toString() !== req.params.dishId
        );
        await user.save();

        res.status(200).json({ message: "Dish removed from saved dishes" });
    } catch (error) {
        next(error);
    }
};
