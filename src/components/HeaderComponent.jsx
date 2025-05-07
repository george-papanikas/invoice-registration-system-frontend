import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'
import 'bootstrap/dist/js/bootstrap.bundle.min';

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn()

    const navigator = useNavigate()

    function handleLogout() {
        logout()
        navigator("/login")
    }

  return (
    <div className='sticky-top'>
        <header>
            <nav className='navbar navbar-expand-lg px-2 py-0' style={{backgroundColor:"#762124"}}>
                <a className='navbar-brand mx-auto text-light' href="http://localhost:3000">Invoice Registration System</a>

              <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
              <span className="navbar-toggler-icon"></span>
            </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className='nav-link text-white' to='/invoices'>Invoices</NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink className='nav-link text-white' to='/customers'>Customers</NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink className='nav-link text-secondary-emphasis' to='/#'>|</NavLink>
                    </li>

                     {
                        !isAuth && 
                                    <li className='nav-item'>
                                        <NavLink to="/register" className="nav-link link-warning">Register</NavLink>
                                    </li>
                        }

                        {
                        !isAuth && 
                                    <li className='nav-item'>
                                        <NavLink to="/login" className="nav-link link-warning">Login</NavLink>
                                    </li>
                        }

                        {
                        isAuth && 
                                    <li className='nav-item'>
                                        <NavLink to="/login" className="nav-link text-warning" onClick={handleLogout}>Logout</NavLink>
                                    </li>
                        }
                  </ul>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent