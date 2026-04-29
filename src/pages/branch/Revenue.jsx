export default function Revenue() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Doanh thu chi nhánh</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Hôm nay</p>
          <h2 className="text-2xl font-bold">52 triệu</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Tháng này</p>
          <h2 className="text-2xl font-bold">1.2 tỷ</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Năm nay</p>
          <h2 className="text-2xl font-bold">15 tỷ</h2>
        </div>
      </div>
    </div>
  );
}