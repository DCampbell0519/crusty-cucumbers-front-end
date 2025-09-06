import { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!user) {
    return navigate("/sign-in", { replace: true });
  } else {
    return children;
  }
};

export default ProtectedRoute;
