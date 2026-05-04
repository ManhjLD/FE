import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HQLayout() {
  const location = useLocation();
const {logout } = useAuth();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-container text-on-primary px-lg py-xl sticky top-0 h-screen overflow-y-auto shadow-soft-navy">
        <h2 className="text-h2 font-bold mb-xl">HQ Admin</h2>

        <nav className="space-y-base">
          <Link
            to="/admin"
            className={`block px-lg py-md rounded-md transition-colors ${
              location.pathname === "/admin"
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/flights"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/flights")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Chuyến bay
          </Link>

          <Link
            to="/admin/branches"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/branches")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Chi nhánh
          </Link>

          <Link
            to="/admin/users"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/users")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Người dùng
          </Link>

          <Link
            to="/admin/airports"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/airports")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Sân bay
          </Link>

          <Link
            to="/admin/aircrafts"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/aircrafts")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Máy bay
          </Link>

          <Link
            to="/admin/tickets"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/tickets")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Vé
          </Link>

          <Link
            to="/admin/payments"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/payments")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Thanh toán
          </Link>

          <Link
            to="/admin/reports"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/admin/reports")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Báo cáo
          </Link>
                    {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500  rounded-md hover:bg-white/10  transition"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  Đăng xuất
                </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-background overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}