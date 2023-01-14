import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (!sessionStorage.getItem("cms_token")) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
