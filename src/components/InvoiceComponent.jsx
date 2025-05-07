import React, {useState, useEffect} from 'react'
import { createInvoice, getInvoice, updateInvoice } from '../services/InvoiceService'
import { getAllCustomers } from '../services/CustomerService'
import {useNavigate, useParams} from 'react-router-dom'

const InvoiceComponent = () => {

  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [customerId, setCustomerId] = useState('')

  const [customers, setCustomers] = useState([])

  const [errors, setErrors] = useState({
    number: '',
    date: '',
    status: '',
    description: '',
    totalAmount: '',
    customer: ''
  })

  const navigator = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    getAllCustomers()
    .then(response => {
      setCustomers(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  },[])

  useEffect(() => {
    if(id){
      getInvoice(id).then((response) => {
        setNumber(response.data.number)
        setDate(response.data.date)
        setStatus(response.data.status)
        setDescription(response.data.description)
        setTotalAmount(response.data.totalAmount)
        setCustomerId(response.data.customerId)

      }).catch(error => {
        console.error(error)
      })
    }   
  }, [id])

  function saveOrUpdateInvoice(e) {
    e.preventDefault()

    if(validateForm()) {
      const invoiceForSave = {number, date, status, description, totalAmount, customerId}
      const invoiceForUpdate = {id, number, date, status, description, totalAmount, customerId}
    

      if(id) {
        updateInvoice(id, invoiceForUpdate)
        .then(response =>{
          console.log(response.data)
          navigator('/invoices')
        }).catch(error => {
          console.error(error)
        })
      } else {
        createInvoice(invoiceForSave)
        .then((response) => {
          console.log(response.data)
          navigator('/invoices')
        }).catch(error => {
          console.error(error);
        })
      }  
    } 
  }

  function validateForm() {
    let valid = true
    
    const errorsCopy = {...errors}

    if(number.trim()) {
      errorsCopy.number = ''
    } else {
      errorsCopy.number = 'Number is required'
      valid = false
    }

    if(date.trim()) {
      errorsCopy.date = ''
    } else {
      errorsCopy.date = 'Date is required'
      valid = false
    }

    if(status.trim()) {
      errorsCopy.status = ''
    } else {
      errorsCopy.status = 'Status is required'
      valid = false
    }

    if(description.trim()) {
      errorsCopy.description = ''
    } else {
      errorsCopy.description = 'Description is required'
      valid = false
    }

    if(totalAmount.trim()) {
      errorsCopy.totalAmount = ''
    } else {
      errorsCopy.totalAmount = 'Total Amount is required'
      valid = false
    }

    if(customerId) {
      errorsCopy.customerId = ''
    } else {
      errorsCopy.customerId = 'Customer is required'
      valid = false
    }
    
    setErrors(errorsCopy)
    
    return valid
  }

  function pageTitle() {
    if(id) {
      return <h2 className='text-center'>Update Invoice</h2>
    }else {
      return <h2 className='text-center'>Register Invoice</h2>
    }
    
  }

  return (
    <div className='min-vh-100' style={{backgroundColor:"#fdf4e6"}}>
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-4 offset-md-4'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Number:
                <span className='text-danger'> * </span>
                </label>
                <input type="text" placeholder='Enter Invoice Number' name='number' value={number}  
                 className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                 onChange={(e) => setNumber(e.target.value)}/>
                 {errors.number && <div className='invalid-feedback'> {errors.number} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Date:
                <span className='text-danger'> * </span>
                </label>
                <input type="date" placeholder='Enter Invoice Issue Date' name='date' value={date}
                className={`form-control ${errors.date ? 'is-invalid' : ''}`} 
                onChange={(e) => setDate(e.target.value)}/>
                {errors.date && <div className='invalid-feedback'> {errors.date} </div>}
              </div>

              <div className='form-group mb-2'>
                            <label className='form-label'>Status:
                            <span className='text-danger'> * </span>
                            </label>
                            <select
                                className='form-control'
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            >
                                <option value="Select status">Select status</option>
                                <option value='paid'>Paid</option>
                                <option value='unpaid'>Unpaid</option>
                            </select>
                </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Description:
                <span className='text-danger'> * </span>
                </label>
                <input type="text" placeholder='Enter Invoice Description' name='description' value={description}
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                onChange={(e) => setDescription(e.target.value)}/>
                {errors.description && <div className='invalid-feedback'> {errors.description} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Total Amount:
                <span className='text-danger'> * </span>
                </label>
                <input type="number" placeholder='Enter Invoice Total Amount in €' name='totalAmount' value={totalAmount}
                className={`form-control ${errors.totalAmount ? 'is-invalid' : ''}`}
                onChange={(e) => setTotalAmount(e.target.value)}/>
                {errors.totalAmount && <div className='invalid-feedback'> {errors.totalAmount} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Select Customer:
                <span className='text-danger'> * </span>
                </label>
                <select className={`form-control ${errors.customer ? 'is-invalid' : ''}`} value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}>
                <option value="Select Customer">Select Customer</option>
                {
                  customers.map(customer => 
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  )
                }
                </select>
                {errors.department && <div className='invalid-feedback'> {errors.department} </div>}
              </div>
              <div className='my-2'>
                <span className='text-danger'> * Required field </span>
              </div>

              <button className='btn btn-success' onClick={saveOrUpdateInvoice}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InvoiceComponent