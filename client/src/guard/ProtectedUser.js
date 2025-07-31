import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function ProtectedUser(props) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
  
      if (!token) {
        setRedirect("/welcome");
      } else if (role !== "user") {
        setRedirect("/404");
      }
    } catch (error) {
      setRedirect("/welcome");
    }
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return props.children;
}
export default ProtectedUser;
