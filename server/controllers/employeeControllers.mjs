import Employee from "../models/employee_model.mjs"
import { ErrorHandler } from "../utils/error.mjs"



export const addEmployee = async (req, res,next) => {
    const {name, email, mobileNo, designation,gender,course } = req.body 

    const newEmployee = new Employee({name, email, mobileNo, designation, gender, course})
    try{
        await newEmployee.save()
        res.status(201).json("Employee added successfully")
    }catch(err){
        next(err)
    }


}   

export const getEmployees = async (req, res, next) => {
    try{
        const employees = await Employee.find()
        res.status(200).json(employees)
    }catch(err){
        next(err)
    }
}

export const updateEmployee = async (req, res, next) => {
    
    const {name, email, mobileNo, designation,gender,course } = req.body 

    try{
        const updatedEmployee = await Employee.findOneAndUpdate(
            {email},
            {name, mobileNo, designation,gender,course},
            { new: true, runValidators: true }
        )

        if(!updatedEmployee){
            return next(ErrorHandler(404, 'User not found'))
        }
        res.status(200).json(updateEmployee)

    }catch(err){
        next(err)
    }

    
}

export const deleteEmployee = async (req, res, next) => {
    const { email } = req.params;

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ email });

        if (!deletedEmployee) {
            return next(ErrorHandler(404, 'Employee not found'));
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        next(err);
    }
};
