export default function Reports() {
  const reports = [
    { branch: "Hà Nội", revenue: "4.2B" },
    { branch: "TP.HCM", revenue: "5.1B" },
    { branch: "Đà Nẵng", revenue: "2.8B" },
  ];

  return (
    <div className="p-lg">
      <h1 className="text-h1 font-bold text-on-background mb-xl">
        Báo cáo toàn cục
      </h1>

      <div className="bg-white rounded-lg shadow-soft-navy p-lg">
        {reports.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-md border-b border-outline-variant last:border-none items-center hover:bg-surface-container px-md transition-colors"
          >
            <span className="text-body-md text-on-surface font-semibold">{item.branch}</span>
            <span className="text-h3 font-bold text-secondary-container">
              {item.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}