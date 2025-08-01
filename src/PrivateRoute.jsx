import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"

export const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.token)
  return user ? <Outlet /> : <Navigate to="/login" />
}