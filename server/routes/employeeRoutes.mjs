import express from 'express';
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from '../controllers/employeeControllers.mjs';
import { ErrorHandler } from '../utils/error.mjs';

const router = express.Router() 

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return next(ErrorHandler(401, 'Access denied. No token provided.'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(ErrorHandler(403, 'Invalid token.'));
        }
        req.user = user; 
        next(); 
    });
};


router.post('/addEmployee', addEmployee)
router.get('/getEmployees',getEmployees)
router.put('/updateEmployee', updateEmployee)
router.delete('/deleteEmployee/:email', deleteEmployee);




export default router
