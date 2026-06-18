import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
     gymId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Gym",
       default: null,
     },
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
     profile :{
         type : String ,
     },
     whatsapp: {
         type: String,
         trim: true,
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
     isReset: {
         type: Boolean,
         default: false
     },
      status: {
       type: String,
       enum: ["Active", "Inactive", "Expired"],
       default: "Active",
     },
        age: {
       type: Number,
       min: 1,
     },
     joinDate: {
       type: Date,
       default: Date.now,
     },
     subscribePlan: {
       type: String,
     },

     verifyCode: String,
     verifyCodeExpire: Date,
     
}, {
     timestamps: true
});

export default mongoose.model("User", UserSchema);
