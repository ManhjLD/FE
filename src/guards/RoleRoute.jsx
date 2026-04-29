import { Navigate } from "react-router-dom";

export default function RoleRoute({
  children,
  role,
}) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user || user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}