import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = localStorage.getItem('token')
  return (
    token !== null ? <Outlet /> : <Navigate to='/login/user' />
  )
}

export default PrivateRoutes;