import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

// This is the User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
});

// This is a middleware. Before saving the data, we need to run this function
userSchema.pre("save", async function(next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    // Agar ye next() nai karenge to program yahi stop ho jaega, next() matlab is middleware ke baad ka code bhi execute karo.
    next();
})


const User = mongoose.model("Users", userSchema)

export default User;