import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import ENV from "../config/env.js";

import { setToken } from "../service/auth.service.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { name, email, password } = req.body;

        //Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //Hash password
        const saltRounds = Number(ENV.SALT_ROUNDS);

        const salt = await bcrypt.genSalt(saltRounds)  ;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{
            name, 
            email,
            password: hashedPassword,
        }], { session });
       
        const token = setToken(newUsers[0]._id);

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0]
            }
        })
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

export const logIn = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            const error = new Error("User doesn't exist!");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error('Invalid/Incorrect Password!');
            error.statusCode = 401;
            throw error;
        }

        const token = setToken(user._id);

        res.status(200).json({
            success: true, 
            message: 'User logged in successfully!',
            data: {
                token,
                user
            }
        });

    }catch(err){
        next(err);
    }
}

export const logOut = async (req, res, next) => {

}