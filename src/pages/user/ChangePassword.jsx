import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { changePassword } = useAuth();
  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [show, setShow] = useState({
    current: false,
    newPass: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.current || !form.newPass || !form.confirm) {
      setError("Vui lòng nhập đầy đủ thông tin mật khẩu.");
      return;
    }

    if (form.newPass !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    const result = await changePassword({
      currentPassword: form.current,
      newPassword: form.newPass,
    });

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Đổi mật khẩu thất bại.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="p-6 md:p-10 min-h-screen">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="mb-10">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-slate-500 mb-2"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              <span className="text-xs uppercase">Quay lại cài đặt</span>
            </Link>

            <h1 className="text-3xl font-bold text-[#002045] mb-2">
              Đổi mật khẩu
            </h1>

            <p className="text-sm text-slate-600">
              Vui lòng cập nhật mật khẩu để bảo vệ tài khoản.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* FORM */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow p-6 border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Current */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">
                      Mật khẩu hiện tại
                    </label>
                    <div className="relative">
                      <input
                        type={show.current ? "text" : "password"}
                        name="current"
                        value={form.current}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShow({ ...show, current: !show.current })
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        <span className="material-symbols-outlined">
                          {show.current ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <hr />

                  {/* New */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        type={show.newPass ? "text" : "password"}
                        name="newPass"
                        value={form.newPass}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="Nhập mật khẩu mới"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShow({ ...show, newPass: !show.newPass })
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        <span className="material-symbols-outlined">
                          {show.newPass ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>

                  {error ? (
                    <p className="text-sm text-[#ba1a1a]">{error}</p>
                  ) : null}

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      disabled={loading}
                      className="px-6 py-3 bg-orange-500 text-[#002045]  border-[#002045] border rounded-lg"
                    >
                      {loading ? "Đang cập nhật..." : "Cập nhật"}
                    </button>

                    <Link
                      to="/profile"
                      className="px-6 py-3 border border-[#002045] text-[#002045] rounded-lg"
                    >
                      Quay lại
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">
                    shield
                  </span>
                  Yêu cầu mật khẩu
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Ít nhất 8 ký tự</li>
                  <li>• Có chữ hoa</li>
                  <li>• Có số</li>
                  <li>• Có ký tự đặc biệt</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border">
                <p className="text-xs text-gray-400 mb-2">Độ mạnh mật khẩu</p>

                <div className="flex gap-1 h-2 mb-2">
                  <div className="flex-1 bg-green-500 rounded"></div>
                  <div className="flex-1 bg-gray-200 rounded"></div>
                  <div className="flex-1 bg-gray-200 rounded"></div>
                  <div className="flex-1 bg-gray-200 rounded"></div>
                </div>

                <p className="text-sm font-semibold text-gray-600">Yếu</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ChangePassword;
