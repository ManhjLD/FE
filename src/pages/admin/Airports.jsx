export default function Airports() {
  const airports = [
    { code: "HAN", name: "Nội Bài" },
    { code: "SGN", name: "Tân Sơn Nhất" },
    { code: "DAD", name: "Đà Nẵng" },
    { code: "PQC", name: "Phú Quốc" },
  ];

  return (
    <div className="p-lg">
      <div className="flex justify-between mb-xl items-center">
        <h1 className="text-h1 font-bold text-on-background">
          Quản lý sân bay
        </h1>

        <button className="bg-secondary-container text-on-secondary px-lg py-md rounded-md font-semibold text-button hover:opacity-90 transition-all active:scale-95 shadow-orange">
          + Thêm sân bay
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-soft-navy overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container">
            <tr>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">Code</th>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">Sân bay</th>
            </tr>
          </thead>

          <tbody>
            {airports.map((item, index) => (
              <tr key={index} className="border-t border-outline-variant hover:bg-surface transition-colors">
                <td className="px-md py-md text-body-md text-on-surface font-semibold">{item.code}</td>
                <td className="px-md py-md text-body-md text-on-surface">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}