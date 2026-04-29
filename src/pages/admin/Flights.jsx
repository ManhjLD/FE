export default function Flights() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý chuyến bay</h1>

      <button className="bg-blue-900 text-white px-5 py-3 rounded mb-6">
        + Thêm chuyến bay
      </button>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Mã</th>
              <th>Tuyến</th>
              <th>Giờ bay</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td>VN001</td>
              <td>HAN → SGN</td>
              <td>08:00</td>
              <td>
                <button className="text-blue-600">Sửa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}