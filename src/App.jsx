import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterUser from './pages/RegisterUser'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PrivateRoute from './Routes/PrivateRoute'
import EditProfile from './pages/EditProfile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </Router>
  )
}

export default App
