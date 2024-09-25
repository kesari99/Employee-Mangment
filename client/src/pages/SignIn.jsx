import { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';


const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector(state => state.user)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    try{
     dispatch(signInStart())
    

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    })

    const data = await res.json()
   
    
    if(data.success === false){
      dispatch(signInFailure(data.message))
      return;
    }
    console.log(data)
    
    Cookies.set('token', data.token, {expires: 7})
    dispatch(signInSuccess(data))
    navigate('/')
  
    


  
  }catch(err){
    dispatch(signInFailure(data.message))


  }




  }



  return (
    <div className='p-3 mx-auto max-w-lg'>
        <h1 className='text-center font-semibold my-7 text-3xl'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
          <input
            type='text'
            placeholder='Email'
            id='email'
            className='border rounded-lg shadow-md p-3 outline-none w-full'
            onChange={handleChange}

          />
          <input
            type='text'
            placeholder='Password'
            id='password'
            className='border rounded-lg shadow-md p-3 outline-none w-full'
            onChange={handleChange}
          />

          <button className='bg-slate-700 rounded-lg  p-3 w-full text-white text-xl'>
            Sign In
          </button>

        </form>
        <p> Don't Have an account
           <Link to={'/sign-up'}>
           <span className='text-blue-700'> sign up</span>
        </Link></p>
        {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn