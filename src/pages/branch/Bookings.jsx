export default function Bookings() {
  const bookings = [
    { id: "BK001", route: "HAN → SGN", amount: "1.2M" },
    { id: "BK002", route: "SGN → PQC", amount: "2.1M" },
    { id: "BK003", route: "HAN → DAD", amount: "850K" },
  ];

  return (
    <div className="p-lg">
      <h1 className="text-h1 font-bold text-on-background mb-xl">
        Đặt vé
      </h1>

      <div className="space-y-md">
        {bookings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-soft-navy p-lg flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 className="font-bold text-h2 text-primary-container">
                {item.route}
              </h3>

              <p className="text-body-md text-on-surface-variant mt-base">
                Mã đặt vé: {item.id}
              </p>
            </div>

            <div className="font-bold text-h2 text-secondary-container">
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}