import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05')"
      }}
    >
      <div className="glass rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Đăng nhập
        </h1>

        <div className="space-y-4">
          <input className="w-full p-4 rounded-xl border" placeholder="Email" />
          <input className="w-full p-4 rounded-xl border" type="password" placeholder="Mật khẩu" />

          <button className="btn-primary w-full">
            Đăng nhập
          </button>
        </div>

        <p className="text-center mt-6">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-700 font-bold">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}