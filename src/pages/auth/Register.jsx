import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Tạo tài khoản
        </h1>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Họ tên</label>
          <input className="w-full p-4 border rounded-xl" placeholder="Họ tên" />
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input className="w-full p-4 border rounded-xl" placeholder="Email" />
          <div className="w-full flex">
            <div className="w-1/2 text-sm font-medium text-gray-700">Số điện thoại</div>
            <div className="w-1/2 text-sm font-medium text-gray-700">Ngày sinh</div>
          </div>
          <input className="w-half p-4 border rounded-xl" placeholder="Số điện thoại" />
          <input className="w-1/2 p-4 border rounded-xl ms-1" type="date" placeholder="Ngày sinh" />
          <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input className="w-half p-4 border rounded-xl" type="password" placeholder="Mật khẩu" />
          <input className="w-1/2 p-4 border rounded-xl ms-1" type="password" placeholder="Xác nhận" />

          <button className="btn-primary w-full">
            Đăng ký
          </button>
        </div>

        <p className="text-center mt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-700 font-bold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}