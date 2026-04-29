import { useAuth } from "../../context/AuthContext";

export default function MyTickets() {
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

        <a className="w-full text-left py-2 px-3 text-gray-500" href="/profile">
          Thông tin cá nhân
        </a>
        <br></br>
        <br></br>
        <a className="w-full text-left py-2 px-3 bg-blue-50 rounded " href="/my-tickets">
          Vé của tôi
        </a>

        <button className="w-full text-left py-2 px-3 text-red-500 mt-6">
          Đăng xuất
        </button>
      </aside>

      {/* CONTENT */}
      <section className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-6">Vé của tôi</h1>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between border-b pb-4">
              <div>
                <p className="font-bold text-xl">HAN → SGN</p>
                <p className="text-gray-500">25/05/2026</p>
              </div>

              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Hủy vé
              </button>
            </div>
          </div>
        </div>

      </section>

    </main>

  );
}