import React, { useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const AddEmployee = () => {
  const [formData, setFormData] = useState({
    course: '',
    gender: '',
    designation: '',
    image: null,
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      
      setFormData((prev) => ({
        ...prev,
        course: checked ? value : '', 
      }));
    } else if (type === 'file') {
      
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    } else {
      // Handle other inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    console.log(token)
    setLoading(true)

    try{
        const res = await fetch('/api/employee/addEmployee', 
            {
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                // 'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(formData)
            }
          )
        //   console.log(res)

        const data = await res.json()
        if(data.success === false){
            setLoading(false)
            setError(data.message)
            return;

        }

        setError(null)
        setLoading(false)
        navigate('/employee-list')


    }catch(err){
        setLoading(false)
        setError(err.message)

    }
    

  } 

  

//   console.log(formData);

  return (
    <>
      <Header />
      <div className='p-3 mx-auto max-w-lg'>
        <h1 className="text-center items-center my-7 font-semibold text-3xl">
          Add Your Employee Here
        </h1>
        <form onSubmit={HandleSubmit} className='flex flex-col gap-3'>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobileNo"
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
                onChange={handleChange}
              />
            </label>

            <label className='font-semibold flex items-center gap-3'>
              Female
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Dropdown for Designation */}
          <label className='flex items-center gap-3'>
            Designation:
            <select
              name="designation"
              onChange={handleChange}
              className='border outline-none rounded-lg p-2 shadow-md'
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </label>

          {/* Checkboxes for Courses */}
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

          {/* Image File Upload */}
          <input
            type="file"
            name="image"
            accept="image/*"
            className='border rounded-lg shadow-md p-2 outline-none'
            onChange={handleChange}
          />

          <button className='border p-2 text-white text-lg rounded-lg bg-slate-700 shadow-md hover:opacity-70'>
            {loading ? 'Adding Employee' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
