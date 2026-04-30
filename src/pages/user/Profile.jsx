import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Profile = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const roleLabel =
    user?.role === "admin"
      ? "Quản trị viên"
      : user?.role === "br_staff"
        ? "Nhân viên trạm"
        : "Khách hàng";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    {
      label: "Thông tin cá nhân",
      icon: "person",
      path: "/profile",
    },
    {
      label: "Vé của tôi",
      icon: "confirmation_number",
      path: "/my-tickets",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-72">
          <div className="bg-white p-4 rounded-xl shadow border space-y-2">
            {/* User info */}
            <div className="pb-4 mb-4 border-b px-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Avatar"
                />
                <div>
                  <p className="font-semibold text-[#002045]">
                    {user?.name || "Người dùng"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "user@email.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}

            {/* Logout */}
            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full px-4 py-3 rounded-lg transition"
              >
                <span className="material-symbols-outlined">logout</span>
                Đăng xuất
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 space-y-6">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/200"
                  className="w-32 h-32 rounded-xl object-cover"
                  alt="Avatar"
                />
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#002045]">
                    {user?.name || "Người dùng"}
                  </h1>
                  <p className="text-gray-500 flex items-center gap-1 justify-center md:justify-start">
                    <span className="material-symbols-outlined text-sm">
                      verified
                    </span>
                    {roleLabel}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link
                    to="/profile/edit"
                    className="bg-[#ed8936] text-white px-5 py-2 rounded-lg hover:opacity-90"
                  >
                    Chỉnh sửa
                  </Link>
                  <Link
                    to="/profile/change-password"
                    className="border border-blue-500 text-blue-500 px-5 py-2 rounded-lg hover:bg-blue-50"
                  >
                    Đổi mật khẩu
                  </Link>
                </div>
              </div>
            </div>

            {/* Membership */}
            <div className="bg-gradient-to-br from-[#002045] to-[#1a365d] text-white rounded-xl p-6">
              <p className="text-xs uppercase opacity-70">Lotusmiles</p>
              <h2 className="text-lg font-semibold">{roleLabel}</h2>

              <div className="mt-6">
                <p className="text-xs opacity-70">Mã người dùng</p>
                <p className="tracking-widest">{user?.user_id || "---"}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs opacity-70">Mã chi nhánh</p>
                <p className="tracking-widest">{user?.MaCN || "---"}</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 space-y-6">
              <h3 className="font-semibold text-[#002045]">
                Thông tin liên hệ
              </h3>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-blue-500">
                  mail
                </span>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{user?.email || "---"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-blue-500">
                  call
                </span>
                <div>
                  <p className="text-xs text-gray-500">SĐT</p>
                  <p className="font-medium">{user?.phone || "---"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <h3 className="font-semibold text-[#002045]">
                Thông tin tài khoản
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">QUYỀN HẠN</p>
                  <p>{roleLabel}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">TRẠNG THÁI</p>
                  <p>Đang hoạt động</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
