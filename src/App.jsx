import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListInvoiceComponent from './components/ListInvoiceComponent'
import InvoiceComponent from './components/InvoiceComponent'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ListCustomerComponent from './components/ListCustomerComponent'
import CustomerComponent from './components/CustomerComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({children}) {

    const isAuth = isUserLoggedIn()

    if(isAuth) return children
    return <Navigate to="/"></Navigate>
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            <Route path='/' element = {<LoginComponent/>}></Route>
            
            <Route path='/invoices' element = {<AuthenticatedRoute><ListInvoiceComponent/></AuthenticatedRoute>}></Route>
            
            <Route path='/add-invoice' element = {<AuthenticatedRoute><InvoiceComponent/></AuthenticatedRoute>}></Route>
           
            <Route path='/edit-invoice/:id' element = {<AuthenticatedRoute><InvoiceComponent/></AuthenticatedRoute>}></Route>
           
            <Route path='/customers' element = {<AuthenticatedRoute><ListCustomerComponent/></AuthenticatedRoute>}></Route>
             
             <Route path='/add-customer' element = {<AuthenticatedRoute><CustomerComponent/></AuthenticatedRoute>}></Route>
             
             <Route path='/edit-customer/:id' element = {<AuthenticatedRoute><CustomerComponent/></AuthenticatedRoute>}></Route>

             <Route path='/register' element={<RegisterComponent/>}></Route>

             <Route path='/login' element={<LoginComponent/>}></Route>
          </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
