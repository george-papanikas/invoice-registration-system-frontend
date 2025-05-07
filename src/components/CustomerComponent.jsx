import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { createCustomer, getCustomerById, updateCustomer } from '../services/CustomerService'

const CustomerComponent = () => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [vatNumber, setVatNumber] = useState('')

  const [errors, setErrors] = useState({
      name: '',
      phone: '',
      email: '',
      vatNumber: ''
    })

  const {id} = useParams()
  const navigator = useNavigate()

  useEffect(() => {
    if(id) {
      getCustomerById(id)
      .then(response => {
        setName(response.data.name)
        setPhone(response.data.phone)
        setEmail(response.data.email)
        setVatNumber(response.data.vatNumber)
      })
      .catch(error => {
        console.error(error)
      })
    }
  },[id]) 

  function saveOrUpdateCustomer(e) {
    e.preventDefault()

    if(validateForm()) {

      const customer = {name, phone, email, vatNumber}
      const customerToUpdate = {id, name, phone, email, vatNumber}
      console.log(customer)

      if(id) {
        updateCustomer(id, customerToUpdate)
        .then(response => {
          console.log(response.data)
          console.log("Update")
          navigator('/customers')
        })
        .catch(error => {
          console.error(error)
        })
      } else {
        createCustomer(customer)
        .then(response => {
          console.log(response.data)
          console.log("Create")
          navigator('/customers')
        })
        .catch(error => {
          console.error(error)
        })
      }
    }  
  }

  function validateForm() {
    let valid = true
    
    const errorsCopy = {...errors}

    if(name.trim()) {
      errorsCopy.name = ''
    } else {
      errorsCopy.name = 'Name is required'
      valid = false
    }

    if(phone.trim()) {
      errorsCopy.phone = ''
    } else {
      errorsCopy.phone = 'Phone is required'
      valid = false
    }

    if(email.trim()) {
      errorsCopy.email = ''
    } else {
      errorsCopy.email = 'Email is required'
      valid = false
    }

    if(vatNumber.trim()) {
      errorsCopy.vatNumber = ''
    } else {
      errorsCopy.vatNumber = 'VAT Number is required'
      valid = false
    }
    
    setErrors(errorsCopy)
    
    return valid
  }

  function pageTitle() {
    if(id) {
      return <h2 className='text-center'>Update Customer</h2>
    } else {
      return <h2 className='text-center'>Add Customer</h2>
    }
  }

  return (
    <div className='min-vh-100' style={{backgroundColor:"#fdf4e6"}}>
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-4 offset-md-4'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Customer Name: 
                  <span className='text-danger'> * </span>
                  </label>
                <input 
                  type="text"
                  name="name"
                  placeholder="Enter Customer Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                />
                {errors.name && <div className='invalid-feedback'> {errors.name} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Customer Phone:
                <span className='text-danger'> * </span>
                </label>
                <input 
                  type="text"
                  name="phone"
                  placeholder="Enter Customer Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  minLength="10"
                  maxLength="10"
                />
                {errors.phone && <div className='invalid-feedback'> {errors.phone} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Customer Email:
                <span className='text-danger'> * </span>
                </label>
                <input 
                  type="email"
                  name="email"
                  placeholder="Enter Customer Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Customer VAT Number:
                <span className='text-danger'> * </span>
                </label>
                <input 
                  type="text"
                  name="vatNumber"
                  placeholder="Enter Customer VAT Number"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className={`form-control ${errors.vatNumber ? 'is-invalid' : ''}`}
                  minLength="9"
                  maxLength="9"
                />
                {errors.vatNumber && <div className='invalid-feedback'> {errors.vatNumber} </div>}
              </div>
              <div className='my-2'>
                <span className='text-danger'> * Required field </span>
              </div>
              <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateCustomer(e)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CustomerComponent