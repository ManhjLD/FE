function BranchDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Dashboard Chi Nhánh
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card title="Khách hàng" value="1,245" />
        <Card title="Vé hôm nay" value="152" />
        <Card title="Doanh thu" value="320 triệu" />
        <Card title="Chuyến bay" value="28" />
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

export default BranchDashboard;