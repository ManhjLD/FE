import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    console.log("📝 Login result:", result);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setError("");

    console.log("👤 User object:", result.user);
    console.log("🎯 User role:", result.user.role);

    if (result.user.role === "admin") {
      console.log("➡️ Navigating to /admin");
      navigate("/admin");
      setLoading(false);
      return;
    }

    if (result.user.role === "staff") {
      console.log("➡️ Navigating to /branch");
      navigate("/branch");
      setLoading(false);
      return;
    }

    console.log("➡️ Navigating to /");
    navigate("/");
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main
        className="flex-grow flex items-center justify-center relative px-4 min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 32, 69, 0.4), rgba(0, 32, 69, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiJOdvhXE0KhXA9gjY6e2sovAjWZeTkUFMsZDYO25x9BSlFygxILzt6q98mayVWydFTCKRyTRBVfK0x8SYeh6kQNam4gmZx7XvehAmm1KDAkynZHnLT7ZJbqAig4GyIjcaplHcf84xnzQTnHwC2sQLxHb7E1EsKX8bLbA1CyCiXo1sybsorlwGDiECU7jHBP_cycqRJPppNUpfZNWqlkTJiNcaPk4K--FgynyElxwKbEYh11D-JhZKKAf60p-HwMw-HTaOrqmp2YpG")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        {/* Container */}
        <div className="w-full max-w-[480px] bg-white/90 backdrop-blur-xl rounded-xl shadow-[0px_16px_40px_rgba(26,54,93,0.16)] p-8 md:p-12">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-[#002045] text-[32px] font-bold mb-1">
              Vietnam Airways
            </div>
            <div className="h-1 w-12 bg-[#ed8936] rounded-full"></div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[24px] font-semibold text-[#002045] mb-1">
              Chào mừng trở lại
            </h1>
            <p className="text-[14px] text-[#43474e]">
              Vui lòng nhập thông tin để tiếp tục hành trình của bạn
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold uppercase text-[#43474e] ml-1">
                EMAIL
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  mail
                </span>

                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full h-[56px] pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[16px]"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[12px] font-bold uppercase text-[#43474e]">
                  MẬT KHẨU
                </label>
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  lock
                </span>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-[56px] pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[16px]"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                {/* <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button> */}
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[56px] bg-[#002045] text-white font-semibold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</span>
            </button>

            {error ? (
              <p className="text-center text-sm text-[#ba1a1a]">{error}</p>
            ) : null}
          </form>

          {/* Footer */}
          <p className="text-center text-[14px] text-gray-500 mt-4">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
