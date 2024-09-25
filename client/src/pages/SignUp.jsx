import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      setLoading(true)
      const res = await fetch('/api/auth/signup', 
        {
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await res.json()
      if (data.success === false) {
        setLoading(false)
        setError(data.message)

        return;

      }

      setError(null)
      setLoading(false)
      navigate('/sign-in')
      

    }catch(err){
      setLoading(false)
      setError(err.message)


    }

  }
  

  return (
    <div className='p-3 mx-auto max-w-lg'>
        <h1 className='text-center font-semibold my-7 text-3xl'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
        <input
            type='text'
            placeholder='UserName'
            id='username'
            className='border rounded-lg shadow-md p-3 outline-none w-full'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Email'
            id='email'
            className='border rounded-lg shadow-md p-3 outline-none w-full'
            onChange={handleChange}

          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            className='border rounded-lg shadow-md p-3 outline-none w-full'
            onChange={handleChange}

          />

          <button  disabled={loading} className='bg-slate-700 rounded-lg  p-3 w-full text-white text-xl'>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>

        </form>
        <p> Have an account
           <Link to={'/sign-in'}>
           <span className='text-blue-700'> sign in</span>
        </Link></p>
        {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp