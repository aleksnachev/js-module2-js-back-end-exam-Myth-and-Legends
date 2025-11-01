import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email:{
        type:String,
        required: [true, 'User email is reqiuired'],
        minLength:[10, 'Email should be at least 10 characters long']
    },
    password:{
        type:String,
        required: [true, 'User password is reqiuired'],
        minLength:[4, 'Password should be at least 4 characters long']
    }
})
userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 12)
})
const User = model('User', userSchema)

export default User