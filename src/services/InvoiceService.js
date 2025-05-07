import axios from 'axios'
import { getToken } from './AuthService'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken()
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

const REST_API_BASE_URL = 'http://localhost:8080/api/invoices'

export const listInvoices = () => axios.get(REST_API_BASE_URL)

export const createInvoice = (invoice) => axios.post(REST_API_BASE_URL, invoice)

export const getInvoice = (invoiceId) => axios.get(REST_API_BASE_URL + '/' + invoiceId)

export const updateInvoice = (invoiceId, invoice) => axios.put(REST_API_BASE_URL + '/' + invoiceId, invoice)

export const deleteInvoice = (invoiceId) => axios.delete(REST_API_BASE_URL + '/' + invoiceId)