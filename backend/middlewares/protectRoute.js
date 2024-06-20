import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
const protectRoute=async(req,res,next)=>{
    const token=req.cookies.jwt;
    try{
        if(!token){
            res.status(401).send({message:"Token not found,Unauthorized access"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).send({message:"Token not valid,Unauthorized access,Wrong credentials"});
        }
        const user=await User.findById(decoded.userId).select("-password");
        
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).send({message:"Protect Route Error,Unauthorized access"});
    }
}
export default protectRoute;