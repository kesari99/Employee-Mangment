import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return element;
};

export default ProtectedRoute;
