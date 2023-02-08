import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import { Home, Products, SingleProduct, About, AuthWrapper, Cart, Error, Checkout, PrivateRoute } from './pages'

const App = () => {
  return <AuthWrapper>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/about" element={<About />}></Route>

        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>

        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>}></Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  </AuthWrapper>
}

export default App
