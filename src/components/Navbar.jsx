import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow relative">
      {/* Logo */}
      <Link to="/" className="font-bold text-2xl text-[#002045]">
        Vietnam Airways
      </Link>

      <div className="flex items-center gap-3 relative">
        {!isAuthenticated ? (
          <>
            <Link to="/register" className="px-4 py-2 text-[#002045]">
              Đăng ký
            </Link>
            <Link
              to="/login"
              className="bg-[#002045] text-white px-4 py-2 rounded"
            >
              Đăng nhập
            </Link>
          </>
        ) : (
          <div className="relative">
            {/* Button user */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
            >
              <span className="material-symbols-outlined text-[20px]">
                account_circle
              </span>
              <span className="text-sm font-medium">
                {user?.name || "User"}
              </span>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {/* Header user */}
                <div className="px-4 py-3 border-b bg-gray-50">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "user@email.com"}
                  </p>
                </div>

                {/* Menu items */}
                <div className="py-2">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      person
                    </span>
                    Thông tin cá nhân
                  </Link>

                  <Link
                    to="/my-tickets"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      confirmation_number
                    </span>
                    Vé của tôi
                  </Link>

                  {/* Branch */}
                  {user?.role === "br_staff" && (
                    <Link
                      to="/branch"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        domain
                      </span>
                      Trang chi nhánh
                    </Link>
                  )}

                  {/* Admin */}
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        admin_panel_settings
                      </span>
                      Trang quản trị
                    </Link>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t" />

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
