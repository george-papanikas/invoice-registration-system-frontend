import React, { useEffect, useState } from 'react'
import { deleteInvoice, listInvoices } from '../services/InvoiceService'
import {useNavigate} from 'react-router-dom'
import { getAllCustomers } from '../services/CustomerService'
import { isAdminUser } from '../services/AuthService'

const ListInvoiceComponent = () => {

    const [invoices, setInvoices] = useState([])
    const [customers, setCustomers] = useState([])

    const navigator = useNavigate()
    const isAdmin = isAdminUser()

    useEffect(() => {
        getAllInvoices()
        getAllCustomers()
    .then(response => setCustomers(response.data))
    .catch(error => console.error(error))
    }, [])

    function getAllInvoices() {
        listInvoices()
        .then(response => setInvoices(response.data))
        .catch(error => console.error(error))
    }

    function addNewInvoice() {
        navigator('/add-invoice')
    }

    function updateInvoice(id) {
        navigator(`/edit-invoice/${id}`)
    }

    function removeInvoice(id) {
        console.log(id)
        deleteInvoice(id) 
        .then(response => getAllInvoices())
        .catch(error => console.error(error))
    }

  return (
    <div className='min-vh-100' style={{backgroundColor:"#fdf4e6"}}>
        <div className='container-md'>
            <h2 className='text-center'>Purchase Invoices List</h2>
            {   
                isAdmin &&
                <button className='btn mb-2' style={{backgroundColor:"#d1b4b5"}} onClick={addNewInvoice}>Add Invoice</button>
            }
               
                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Invoice Status</th>
                            <th>Invoice Description</th>
                            <th>Invoice Total Amount</th>
                            <th>Invoice Customer</th>    
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoices.map(invoice => 
                                <tr key={invoice.id}>
                                    <td>{invoice.number}</td>
                                    <td>{invoice.date}</td>
                                    <td>{invoice.status}</td>
                                    <td>{invoice.description}</td>
                                    <td>{invoice.totalAmount}</td>
                                    <td>{customers.filter(customer => (invoice.customerId === customer.id))
                                                .map(customer => customer.name)
                                            }</td>
                                    <td>
                                        {
                                            isAdmin &&
                                            <button className='btn' style={{backgroundColor:"#8a7360"}}
                                            onClick={() => updateInvoice(invoice.id)}>Update</button>
                                        }
                                        {
                                            isAdmin &&
                                            <button className='btn ms-1' style={{backgroundColor:"#9c282d"}}
                                        onClick={() => removeInvoice(invoice.id)}>Delete</button>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default ListInvoiceComponent
