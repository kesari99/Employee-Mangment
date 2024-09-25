import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';


const EditEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employee = location.state; 
    console.log(employee)

    const [formData, setFormData] = useState({
        name: employee.name,
        email: employee.email,
        mobileNo: employee.mobileNo,
        designation: employee.designation,
        gender: employee.gender,
        course: employee.course || '', 
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        
        if (name === 'course') {
            setFormData((prev) => ({
                ...prev,
                course: prev.course === value ? '' : value, 
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/employee/updateEmployee`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            navigate('/employee-list');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <>
            <Header />
            <div className='p-3 mx-auto max-w-lg'>
                <h1 className="text-center items-center my-7 font-semibold text-3xl">
                    Edit Employee Details
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Name"
                        className='border rounded-lg shadow-md p-3 outline-none'
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        className='border rounded-lg shadow-md p-3 outline-none'
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        placeholder="Mobile No"
                        className='border rounded-lg shadow-md p-3 outline-none'
                        onChange={handleChange}
                    />
                    <div className='flex item-center gap-4'>
                        <label className='font-semibold flex items-center gap-3'>
                            Male
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                        </label>

                        <label className='font-semibold flex items-center gap-3'>
                            Female
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <label className='flex items-center gap-3'>
                        Designation:
                        <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className='border outline-none rounded-lg p-2 shadow-md'
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </label>

                    <div className='flex flex-col'>
                        <label className='font-semibold'>Course:</label>
                        <label className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                checked={formData.course === 'MCA'}
                                onChange={handleChange}
                            />
                            MCA
                        </label>
                        <label className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                checked={formData.course === 'BCA'}
                                onChange={handleChange}
                            />
                            BCA
                        </label>
                        <label className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                checked={formData.course === 'BSC'}
                                onChange={handleChange}
                            />
                            BSC
                        </label>
                    </div>

                    <button className='border p-2 text-white text-lg rounded-lg bg-slate-700 shadow-md hover:opacity-70'>
                        {loading ? 'Updating Employee' : 'Update'}
                    </button>
                </form>
                {error && <p className='text-red-700 mt-5'>{error}</p>}
            </div>
        </>
    );
};

export default EditEmployee;
