import jwt from "jsonwebtoken";

const generateToken = (user) => {
  
   console.log("uswr" ,user._id , "gym" ,user.gymId) ;
  return jwt.sign(
   
     {
    id: user._id,
    gymId: user.gymId,   
    role: user.role,
  }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

export default generateToken;
