import React, { useState } from 'react'
import { registerUser } from '../services/AuthService.js'
import { useNavigate } from 'react-router-dom' 

const RegisterComponent = () => {

const [name, setName] = useState('')
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigator = useNavigate()
const [errorMessage, setErrorMessage] = useState('');

function isValidEmail(emailStr) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(emailStr)
}

function handleRegistration(e) {
    e.preventDefault()

      setErrorMessage('')

      if (!name || !username || !email || !password) {
        setErrorMessage('All fields are required.')
        return
      }
  
      if (!isValidEmail(email)) {
        setErrorMessage('Please enter a valid email.')
        return
      }

    const registration = {name, username, email, password}
    registerUser(registration).then(response => {
        console.log(response.data)
        navigator("/login")

    }).catch(error => {
        console.error(error)
        setErrorMessage('Registration failed. Please try again')})
}
  return (
    <div className='container'>
        <br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='text-center'>Registration</h2>
                    </div>

                    <div className='card-body'>
                        <form onSubmit={handleRegistration}>
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'>Name</label>
                                <div className='col-md-9'>
                                    <input type="text" name="name" className='form-control' placeholder='Enter name'
                                        value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'>Username</label>
                                <div className='col-md-9'>
                                    <input type="text" name="username" className='form-control' placeholder='Enter username'
                                        value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'>Email</label>
                                <div className='col-md-9'>
                                    <input type="email" name="email" className='form-control' placeholder='Enter email'
                                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'>Password</label>
                                <div className='col-md-9'>
                                    <input type="password" name="password" className='form-control' placeholder='Enter password'
                                        value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' type="submit">Submit</button>
                                </div>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterComponent