import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, requiredRoles }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  console.log("🔐 PrivateRoute check:", {
    token: !!token,
    user,
    userRole: user?.role,
    requiredRoles,
    storedUser: storedUser ? JSON.parse(storedUser) : null,
  });

  if (!token || !user) {
    console.log("❌ No token or user, redirecting to login");
    return <Navigate to="/login" />;
  }

  // If specific roles are required, check if user has one of those roles
  if (requiredRoles && Array.isArray(requiredRoles) && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    console.log("Checking role:", {
      userRole: user.role,
      userRoleType: typeof user.role,
      userRoleStringified: JSON.stringify(user.role),
      requiredRoles,
      requiredRolesStringified: JSON.stringify(requiredRoles),
      hasRequiredRole,
      roleComparison: requiredRoles.map(r => ({
        required: r,
        requiredType: typeof r,
        matches: r === user.role
      }))
    });
    if (!hasRequiredRole) {
      console.log(
        "❌ User role '" + user.role + "' not in required roles " + JSON.stringify(requiredRoles)
      );
      // Redirect to appropriate dashboard based on user's role
      if (user.role === "admin") {
        return <Navigate to="/admin" />;
      } else if (user.role === "staff") {
        return <Navigate to="/branch" />;
      }
      return <Navigate to="/" />;
    }
  }

  console.log("✅ User authorized, rendering children");
  return children;
}