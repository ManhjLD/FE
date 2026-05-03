import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const ProfileEdit = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
      confirmPassword: "",
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // If user wants to change password, validate confirmation
    if (
      (form.password || form.confirmPassword) &&
      form.password !== form.confirmPassword
    ) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    if (form.password) {
      payload.password = form.password;
    }

    const result = await updateUser(payload);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Cập nhật thất bại.");
    }

    setLoading(false);
  };

  const roleLabel =
    user?.role === "admin"
      ? "Quản trị viên"
      : user?.role === "staff"
        ? "Nhân viên trạm"
        : "Khách hàng";

  return (
    <>
      <Navbar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <nav className="flex gap-2 text-xs text-slate-500 mb-2">
              <span>Hệ thống</span>
              <span>/</span>
              <span className="text-[#002045]">Chỉnh sửa hồ sơ</span>
            </nav>

            <h1 className="text-3xl font-bold text-[#002045]">
              Thông tin cá nhân
            </h1>

            <p className="text-sm text-slate-600 mt-2">
              Cập nhật thông tin tài khoản của bạn.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Avatar */}
              <div className="bg-white p-6 rounded-xl shadow border flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                    alt="Avatar"
                  />
                </div>

                <h2 className="text-lg font-semibold text-[#002045]">
                  {form.name || "Người dùng"}
                </h2>

                <p className="text-sm text-gray-500 mb-4">{roleLabel}</p>

                <div className="w-full pt-4 border-t text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Trạng thái</span>
                    <span className="text-green-600 font-semibold">
                      Đang hoạt động
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Mã chi nhánh</span>
                    <span className="font-medium">{user?.MaCN || "---"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white p-6 rounded-xl shadow border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                      <label className="text-xs text-gray-500">Họ và tên</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-3 border rounded-lg"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-gray-500">Email</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-3 border rounded-lg"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs text-gray-500">SĐT</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-3 border rounded-lg"
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="text-xs text-gray-500">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Để trống nếu không đổi"
                        className="w-full mt-1 px-4 py-3 border rounded-lg"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="text-xs text-gray-500">
                        Xác nhận mật khẩu
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Xác nhận mật khẩu mới"
                        className="w-full mt-1 px-4 py-3 border rounded-lg"
                      />
                    </div>

                    <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-gray-50 border">
                        <p className="text-xs text-gray-500 mb-1">User ID</p>
                        <p className="font-medium">{user?.user_id || "---"}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-gray-50 border">
                        <p className="text-xs text-gray-500 mb-1">Quyền hạn</p>
                        <p className="font-medium">{roleLabel}</p>
                      </div>
                    </div>
                  </div>

                  {error ? (
                    <p className="text-sm text-[#ba1a1a]">{error}</p>
                  ) : null}

                  {/* Buttons */}
                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <Link to="/profile" className="px-6 py-3 text-gray-600">
                      Hủy
                    </Link>

                    <button
                      disabled={loading}
                      className="px-8 py-3 bg-orange-500 text-gray-600 rounded-lg"
                    >
                      {loading ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileEdit;
