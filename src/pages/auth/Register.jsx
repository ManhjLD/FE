import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <main
        className="flex items-center justify-center min-h-screen px-6 py-12 relative"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAs6QT6ZEK2NEMd6VZBK-lKWeGHIhSna0KenostD_QoRH7JsH1ixDDvrk7dgsR1XRhdRFaj_ou-aWu8wY6CI2wHANFTPZGUBMQyRkk_UPtP2pDWqnreG2AIPqVSYmnDpovDo48OH22ckgYAMUAWffNXHf4LNUITLMixlJbLUzpp9FA11Qkjx3jw6xu336xslSVCKziDFNkgNm_H539vpnbO8NUAnZow2_th92WaALPZqa9IWfduSsILJtnouqgY3u3MoffSVXO8pmI-')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

        <div className="relative w-full max-w-[520px]">
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-xl shadow-[0px_16px_40px_rgba(26,54,93,0.08)] border border-white/50">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-[#002045] mb-2">
                Tạo tài khoản mới
              </h1>
              <p className="text-sm text-gray-500">
                Khám phá thế giới cùng Vietnam Airways
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">
                  HỌ TÊN
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    person
                  </span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Nguyễn Văn A"
                    className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DOB */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">
                    NGÀY SINH
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      calendar_today
                    </span>

                    <input
                      type="date"
                      name="birthday"
                      className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={form.birthday || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">
                    SỐ ĐIỆN THOẠI
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      call
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="0123 456 789"
                      className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">EMAIL</label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    mail
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">
                    MẬT KHẨU
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      lock
                    </span>

                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">
                    XÁC NHẬN
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      lock_reset
                    </span>

                    <input
                      type="password"
                      name="confirm"
                      placeholder="••••••••"
                      className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={form.confirm}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[56px] bg-[#002045] text-white font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </button>

              {error ? (
                <p className="text-sm text-[#ba1a1a] text-center">{error}</p>
              ) : null}
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Đã có tài khoản?
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
