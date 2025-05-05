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
import RegisterPet from './pages/RegisterPet'
import EditPet from './pages/EditPet'
import EcommerceApp from './ecommerce/EcommerceApp'
import Appointments from './pages/Appointments'
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/cadastrar" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
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
          path="/cadastrar-pet"
          element={
            <PrivateRoute>
              <RegisterPet />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-pet/:id"
          element={
            <PrivateRoute>
              <EditPet />
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
        <Route path="/loja/*" element={<EcommerceApp />} />
      </Routes>
    </Router>
  )
}

export default App
