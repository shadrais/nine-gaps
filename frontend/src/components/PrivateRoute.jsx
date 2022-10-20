import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useUserContext from '../context/userContext'
const PrivateRoute = () => {
  return localStorage.getItem('token') ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
