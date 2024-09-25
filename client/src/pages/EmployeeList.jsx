import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const navigate = useNavigate();

  // Fetch employees data
  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employee/getEmployees', {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (email) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`/api/employee/deleteEmployee/${email}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }

        
        fetchEmployees();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (employee) => {
    navigate('/edit-employee', { state: employee });
  };

  
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div>
        <h1 className="text-center text-3xl font-semibold my-7">Employee List</h1>

      
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name"
            className="border outline-none border-gray-600 p-2 rounded-lg shadow-md w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>

        <table className="min-w-full border-collapse border p-3 border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Email</th>
              <th className="border border-gray-200 p-2">Mobile No</th>
              <th className="border border-gray-200 p-2">Gender</th>
              <th className="border border-gray-200 p-2">Designation</th>
              <th className="border border-gray-200 p-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="border border-gray-200 p-2">{employee.name}</td>
                  <td className="border border-gray-200 p-2">{employee.email}</td>
                  <td className="border border-gray-200 p-2">{employee.mobileNo}</td>
                  <td className="border border-gray-200 p-2">{employee.gender}</td>
                  <td className="border border-gray-200 p-2">{employee.designation}</td>
                  <td className="border border-gray-200 p-2">{employee.course}</td>
                  <td className="border border-gray-200 p-2">
                    {employee.image && (
                      <img src={employee.image} alt={employee.name} className="w-16 h-16 object-cover" />
                    )}
                  </td>
                  <td className="border border-gray-200 p-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.email)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </>
  );
};

export default EmployeeList;
