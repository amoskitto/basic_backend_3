import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 3,
            maxLength: 30,
        }, 
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxLength: 50
        }
    }, 
    {
        timestamps: true
    }

    
)


// thise for before saving the user you need to check 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10);
})

// comparing the password in the database to the one the user is typing 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("user", userSchema)