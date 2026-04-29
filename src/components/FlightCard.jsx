export default function FlightCard({
  from,
  to,
  time,
  price,
  image
}) {
  return (
    <div className="card overflow-hidden">
      <img
        src={image}
        className="h-52 w-full object-cover"
      />

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {from} → {to}
          </h2>

          <span className="text-sm text-gray-500">
            {time}
          </span>
        </div>

        <p className="text-3xl font-bold text-blue-900 mb-4">
          {price}
        </p>

        <button className="btn-primary w-full">
          Đặt vé
        </button>
      </div>
    </div>
  );
}