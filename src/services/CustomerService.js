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

const CUSTOMER_REST_API_BASE_URL = 'http://localhost:8080/api/customers'

export const getAllCustomers = () => axios.get(CUSTOMER_REST_API_BASE_URL)

export const createCustomer = (customer) => axios.post(CUSTOMER_REST_API_BASE_URL, customer)

export const getCustomerById = (id) => axios.get(CUSTOMER_REST_API_BASE_URL + '/' + id)

export const updateCustomer = (id, customer) => axios.put(CUSTOMER_REST_API_BASE_URL + '/' + id, customer)

export const deleteCustomer = (id) => axios.delete(CUSTOMER_REST_API_BASE_URL + '/' + id)