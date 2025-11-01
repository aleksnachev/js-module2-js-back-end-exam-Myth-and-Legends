import {Schema,model,Types} from 'mongoose'

const mythsSchema = new Schema({
    name:{
        type:String,
        required: [true, 'Myth name is required'],
        minLength:[2, 'Name should be at least 2 characters long']
    },
    origin:{
        type:String,
        required: [true, 'Myth origin is required'],
        minLength:[3, 'Origin should be at least 3 characters long']
    },
    role:{
        type:String,
        required: [true, 'Myth name is required'],
        minLength:[2, 'Role should be at least 2 characters long']
    },
    imageUrl:{
        type:String,
        required: [true, 'Image Url is required'],
        match: [/^https?:\/\//, 'Invalid image Url']
    },
    symbol:{
        type:String,
        required: [true, 'Myth symbol is required'],
        minLength:[3, 'Symbol should be at least 3 characters long'],
        maxLength:[40, 'Symbol should be less than 40 characters long']
    },
    era:{
        type:String,
        required: [true, 'Myth era is required'],
        minLength:[5, 'Era should be at least 5 characters long'],
        maxLength:[15, 'Era should be less than 15 characters long']
    },
    description:{
        type:String,
        required: [true, 'Myth description is required'],
        minLength:[10, 'Description should be at least 10 characters long']
    },
    owner:{
        type:Types.ObjectId,
        ref:'User'
    },
    followers:[{
        type:Types.ObjectId,
        ref:'User'
    }]
})

const Myth = model('Myth', mythsSchema)
export default Myth