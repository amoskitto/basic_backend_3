import { User } from "../models/user.model.js";

const registerUser = async (req, res) => { 
    try {
        const { username, password, email } = req.body;
        

        // basic validation 
        if(!username || !email || !password){
            return res.status(400).json({message: "all fields are important"})
        }
        // check if the user exist already 
        const existing = await User.findOne({email: email.toLowerCase() })
        if (existing) {
            return res.status(400).json({message: "user already exists"})
        }

        // create a new user
        const user = await User.create({
            user_name: username,
            email: email.toLowerCase(),
            password
        })
        res.status(201).json({
            message: "user registered successfully",
            user:  {id: user._id, email: user.email, username: user.user_name}
        })
    } catch (error) {
        console.error("Register user error:", error);
        res.status(500).json({message: "internal server error"})
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.user_name
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email.toLowerCase() });

        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { registerUser, loginUser, logoutUser };