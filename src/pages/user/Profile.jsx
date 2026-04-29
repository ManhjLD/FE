import React from "react";
import { useAuth } from "../../context/AuthContext";
import MyTickets from "./MyTickets";

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 flex gap-6">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white p-4 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4 border-b pb-4">
          <img
            src={user?.avatar || "https://i.pravatar.cc/100"}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-bold text-primary">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs text-gray-500">Thành viên</p>
          </div>
        </div>

        <a className="w-full text-left py-2 px-3 bg-blue-50 rounded" href="/profile">
          Thông tin cá nhân
        </a>
        <br></br>
        <br></br>
        <a className="w-full text-left py-2 px-3 text-gray-500" href="/my-tickets">
          Vé của tôi
        </a>

        <button className="w-full text-left py-2 px-3 text-red-500 mt-6">
          Đăng xuất
        </button>
      </aside>

      {/* CONTENT */}
      <section className="flex-1 space-y-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold text-primary">
            {user?.name}
          </h1>
          <p className="text-gray-500">
            Tài khoản đã xác thực
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl">
            <p className="text-xs text-gray-400">EMAIL</p>
            <p className="font-semibold">{user?.email}</p>
          </div>

          <div className="bg-white p-4 rounded-xl">
            <p className="text-xs text-gray-400">SỐ ĐIỆN THOẠI</p>
            <p className="font-semibold">0900000000</p>
          </div>
        </div>

      </section>

    </main>
  );
};

export default Profile;