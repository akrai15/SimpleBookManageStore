import User from '../models/user.model.js'
import bycrypt from 'bcryptjs'
import generateTokenAndSetCookie  from '../utils/generateToken.js'


export const signup = async (req, res) => {
    try{
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"Please enter all fields"})
        }
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const salt=await bycrypt.genSalt(10);
        const hashedPassword=await bycrypt.hash(password,salt);


        const newUser=new User({
            name,
            email,
            password:hashedPassword
        })
        if(newUser){
            await newUser.save();
            generateTokenAndSetCookie(newUser._id,res);
            return res.status(201).json({newUser})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Server error In Signup"})
    }

}



export const login = async (req, res) => {

    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"Please enter all fields"})
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exists"})
        }
        const isMatch=await bycrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"})
        }
        generateTokenAndSetCookie(user._id,res);
       res.status(200).json({user})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Server error In Login"})
    }



    
}



export const logout = async (req, res) => {
    try{
        res.clearCookie("jwt","",{maxAge:0});
        return res.status(200).json({Success:"User logged out successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Server error In Logout"})
    }
    
}