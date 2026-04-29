function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Dashboard Tổng Hệ Thống
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card title="Tổng User" value="25,120" />
        <Card title="Chi nhánh" value="18" />
        <Card title="Sân bay" value="42" />
        <Card title="Doanh thu tháng" value="12 tỷ" />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default AdminDashboard;