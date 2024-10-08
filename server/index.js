import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/dbConnection.mjs';

import authRoutes from './routes/authRoutes.mjs';
import employeeRoutes from './routes/employeeRoutes.mjs';




dotenv.config()
const app = express()
app.use(express.json())

connectToDB()

const port = process.env.PORT || 5001 

app.use('/api/auth', authRoutes)
app.use('/api/employee', employeeRoutes)



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server Error'

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message

    })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
