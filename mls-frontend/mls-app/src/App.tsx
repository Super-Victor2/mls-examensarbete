import './App.css'
import { Route, Routes } from 'react-router-dom'

import AccountPage from './Pages/AccountPage/AccountPage'
import BookingPage from './Pages/BookingPage/BookingPage'
import ConfirmOrderPage from './Pages/ConfirmOrderPage/ConfirmOrderPage'
import HomePage from './Pages/HomePage/HomePage'
import OrderPage from './Pages/OrderPage/OrderPage'
import OrdersPage from './Pages/OrdersPage/OrdersPage'
import UserPage from './Pages/UserPage/UserPage'
import Header from './Components/HeaderComps/HeaderComp'

function App() {
  return (
    <>
      <div className="app">
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/AboutPage' element={<AccountPage />} />
          <Route path='/MenyPage' element={<BookingPage />} />
          <Route path='/CartPage' element={<ConfirmOrderPage />} />
          <Route path='/OrderPage' element={<OrderPage />} />
          <Route path='/OrdersPage' element={<OrdersPage />} />
          <Route path='/UserPage' element={<UserPage />} />
      </Routes>
      </div>
    </>
  )
}

export default App
