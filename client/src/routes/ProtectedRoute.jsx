import { Navigate } from "react-router-dom";
import { TOKEN_KEY } from "../utils/constants";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;