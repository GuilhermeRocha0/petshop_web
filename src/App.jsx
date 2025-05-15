import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import RegisterUser from './pages/RegisterUser'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PrivateRoute from './routes/PrivateRoute'
import EditProfile from './pages/EditProfile'
import ChangePassword from './pages/ChangePassword'
import Pets from './pages/Pets'
import EcommerceApp from './ecommerce/EcommerceApp'
import Appointments from './pages/Appointments'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Products from './pages/Products'

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/cadastrar" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-perfil"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/alterar-senha"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <PrivateRoute>
              <Pets />
            </PrivateRoute>
          }
        />
        <Route
          path="/agendamentos"
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/produtos"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route path="/loja/*" element={<EcommerceApp />} />
      </Routes>
    </Router>
  )
}

export default App
