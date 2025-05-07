import React, {useEffect, useState} from 'react'
import { getAllCustomers, deleteCustomer } from '../services/CustomerService'
import {Link, useNavigate} from 'react-router-dom'
import { isAdminUser } from '../services/AuthService'

const ListCustomerComponent = () => {

  const [customers, setCustomers] = useState([])
  const navigator = useNavigate()
  const isAdmin = isAdminUser()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    listOfCustomers()
  }, [])

  function listOfCustomers() {
    getAllCustomers()
    .then(response => {
      console.log(response.data)
      setCustomers(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  function updateCustomer(id) {
    navigator(`/edit-customer/${id}`)
  }

  function removeCustomer(id) {
    deleteCustomer(id)
    .then(response => {
      console.log("Customer deleted")
      listOfCustomers()
      setErrorMessage('')
    })
    .catch(error => {
      console.error(error)
      setErrorMessage('Cannot delete customer with existing invoices.')
    })
  }

  return (
    <div className='min-vh-100' style={{backgroundColor:"#fdf4e6"}}>
      <div className='container-md'>
        <h2 className='text-center'>Customer List</h2>
        {
          isAdmin &&
          <Link to='/add-customer' className='btn mb-2' style={{backgroundColor:"#d1b4b5"}}>Add Customer</Link>
        }
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Customer Email</th>
              <th>Customer VAT Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map(customer => 
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.vatNumber}</td>
                  <td>
                    {
                      isAdmin &&
                      <button onClick={() => updateCustomer(customer.id)} className='btn' style={{backgroundColor:"#8a7360"}}>Update</button>
                    }
                    {
                      isAdmin &&
                      <button onClick={() => removeCustomer(customer.id)} 
                      className='btn ms-1' style={{backgroundColor:"#9c282d"}}>Delete</button>
                    }
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListCustomerComponent