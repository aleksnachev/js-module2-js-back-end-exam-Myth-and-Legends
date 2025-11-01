import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { generateAuthToken } from "../utils/tokenUtils.js";

export async function register(email,password,repeatPassword){
    // Check if user exists
    const user = await User.findOne({email})

    if (user){
        throw new Error('Emial already exists')
    }
    // 

    if (password !== repeatPassword){
        throw new Error('Password missmatch!')
    }
    const createdUser = await User.create({email,password})
    const token = generateAuthToken(createdUser)
    return token
}

export async function login(email,password){
    const user = await User.findOne({email})

    if (!user){
        throw new Error ('Invalid email or password')
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid){
        throw new Error ('Invalid email or password')
    }

    const token = generateAuthToken(user)
    return token
}