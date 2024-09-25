import { Link, useNavigate } from 'react-router-dom'
import employeeImg from '../assets/employee.png'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie';



const  Header = () => {
  const {currentUser} = useSelector(state => state.user)
  const navigate = useNavigate()
  // console.log(currentUser)

  const logOutUser = () => {
    Cookies.remove('token')
    navigate('/sign-in')

  }



  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 
          <div className='flex justify-center items-center gap-5'>
            <Link to="/">
            <img
                src={employeeImg}
                className='w-10 h-10'
             
             />
             
            </Link>

            <ul className='flex gap-10 items-center'>
            <Link to="/">
                <li className='text-slate-700 hover:underline'>Home</li>
                
                </Link>
                <Link to="/employee-list ">
                <li className='text-slate-700 hover:underline'> Employee List</li>
                
                </Link>
                <Link to="/add-employee">
                <li className='text-slate-700 hover:underline'> Add Employee</li>
                
                </Link>
            </ul>
           


            </div>

            <ul className='flex gap-10 items-center'>
                <Link to={"/profile"}>
                <li className='text-slate-700 hover:underline'> {currentUser && currentUser.user ? currentUser.user.username : 'Profile'}</li>
                </Link>
                <li>
                <button onClick={logOutUser} className='rounded-lg p-2 text-semibold text-white border bg-slate-600 hover:opacity-75'>
                 Sign out
                </button> 
                </li>

                
               
            </ul>

           


        </div>
    </header>
  )
}

export default Header