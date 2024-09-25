import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobileNo:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    image: {  
        type: String,
        required: false,
    }


}, {timestamps:true})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee