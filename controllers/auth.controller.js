import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {

        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: [
                    !name ? "User name is required" : null,
                    !email ? "User email is required" : null,
                    !password ? "User password is required" : null,
                ]
                    .filter(Boolean)
                    .join(", "),
            });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser){
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }
        // Hash password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{name, email, password: hashedPassword}], {session})
        const token = jwt.sign({userId: newUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction()

        await session.endSession()
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0]
            }
        })
    }catch (error) {
        await session.abortTransaction()
        await session.endSession()
        next(error)
    }

}
export const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user){
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            const error = new Error('Invalid credentials')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                token,
                user
            }
        })

    }catch (e) {
        next(e)

    }

}
export const signOut = async (req, res, next) => {

}