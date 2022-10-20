import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useUserContext from '../context/userContext'
const PrivateRoute = () => {
  const { user } = useUserContext()
  return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
