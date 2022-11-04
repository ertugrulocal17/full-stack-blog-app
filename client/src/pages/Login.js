import React, {useContext, useState}from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
function Login() {
  const [inputs,setInputs] = useState({
    username: '',
    password: '',
  })
  const [err,setErr] = useState(null);

  const navigate = useNavigate()

  const {login} = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate('/')
    }catch(err){
      setErr(err.response.data)
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input type="password" placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit} type='submit'>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to='/register'>Register</Link> </span>
      </form>
    </div>
  )
}

export default Login