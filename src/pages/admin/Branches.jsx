export default function Branches() {
  const branches = [
    "Hà Nội",
    "TP.HCM",
    "Đà Nẵng",
    "Phú Quốc",
  ];

  return (
    <div className="p-lg">
      <div className="flex justify-between mb-xl items-center">
        <h1 className="text-h1 font-bold text-on-background">
          Quản lý chi nhánh
        </h1>

        <button className="bg-secondary-container text-on-secondary px-lg py-md rounded-md font-semibold text-button hover:opacity-90 transition-all active:scale-95 shadow-orange">
          + Thêm chi nhánh
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-md">
        {branches.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-soft-navy p-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            <p className="text-h3 font-bold text-primary-container">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}