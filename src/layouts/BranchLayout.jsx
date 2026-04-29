import { Link, Outlet, useLocation } from "react-router-dom";

export default function BranchLayout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-container text-on-primary px-lg py-xl sticky top-0 h-screen overflow-y-auto shadow-soft-navy">
        <h2 className="text-h2 font-bold mb-xl">Branch</h2>

        <nav className="space-y-base">
          <Link
            to="/branch/dashboard"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/branch/dashboard")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/branch/bookings"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/branch/bookings")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Đặt vé
          </Link>

          <Link
            to="/branch/users"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/branch/users")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Người dùng
          </Link>

          <Link
            to="/branch/revenue"
            className={`block px-lg py-md rounded-md transition-colors ${
              isActive("/branch/revenue")
                ? "bg-nav-active text-on-background font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Doanh thu
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-background overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}