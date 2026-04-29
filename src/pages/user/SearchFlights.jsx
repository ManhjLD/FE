function SearchFlights() {
  const flights = [
    {
      route: "Hà Nội → TP.HCM",
      time: "08:00 - 10:10",
      price: "1.200.000đ"
    },
    {
      route: "Hà Nội → Đà Nẵng",
      time: "12:00 - 13:20",
      price: "850.000đ"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Tìm chuyến bay
      </h1>

      <div className="space-y-5">
        {flights.map((f, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-2xl p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">{f.route}</h2>
              <p className="text-gray-500">{f.time}</p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">{f.price}</p>
              <button className="mt-2 bg-primary text-white px-5 py-2 rounded-lg">
                Đặt vé
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchFlights;