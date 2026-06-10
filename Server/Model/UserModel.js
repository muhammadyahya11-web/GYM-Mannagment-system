import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone : {
        type : Number ,

        
    },
    image :{
        type : String ,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["client", "owner", "trainer"],
        default: "client"
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCode: String,
    verifyCodeExpire: Date,
    
});

export default mongoose.model("User", UserSchema);
