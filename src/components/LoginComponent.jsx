import React, { useState } from 'react'
import { loginUser, saveLoggedInUser, storeToken } from '../services/AuthService'
import { useNavigate } from 'react-router-dom' 

const LoginComponent = () => {

    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigator = useNavigate()
    
    async function handleLogin(e) {

        e.preventDefault()

        await loginUser(usernameOrEmail, password).then(response => {
            console.log(response.data)
            localStorage.clear()
            sessionStorage.clear()
        
            const token = 'Bearer ' + response.data.accessToken
            const role = response.data.role
            
            storeToken(token)
            saveLoggedInUser(usernameOrEmail, role)

            console.log("token: " + token)

            navigator("/invoices")
        }).catch(error => {
            console.error(error)
            setErrorMessage('Invalid credentials. Please try again.')
        })
    }

  return (
    <div className='container'>
        <br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='text-center'>Login</h2>
                    </div>

                    <div className='card-body'>
                        <form onSubmit={handleLogin}>
                            <div className='row mb-3'>
                                <label className='col-md-4 control-label'>Username or Email</label>
                                <div className='col-md-8'>
                                    <input type="text" name="usernameOrEmail" className='form-control' placeholder='Enter username or email'
                                        value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-md-4 control-label'>Password</label>
                                <div className='col-md-8'>
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

export default LoginComponent