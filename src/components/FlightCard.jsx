import { useNavigate } from "react-router-dom";

function FlightCard({ flight }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all group flex flex-col">
      <div className="h-48 relative overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={flight.image}
          alt=""
        />
      </div>

      <div className="p-md flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-sm">
            <div className="text-center">
              <p className="font-h3 text-h3 text-primary">{flight.fromCode}</p>
              <p className="font-body-sm text-outline">{flight.fromCity}</p>
            </div>

            <div className="flex flex-col items-center flex-1 px-4">
              <span className="text-outline text-xs">{flight.duration}</span>
              <div className="w-full h-px bg-slate-200 relative my-2">
                <span
                  className="material-symbols-outlined absolute left-1/2 -translate-x-1/2 -top-2.5 text-secondary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  flight
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="font-h3 text-h3 text-primary">{flight.toCode}</p>
              <p className="font-body-sm text-outline">{flight.toCity}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-outline mb-md">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>{flight.time}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-md border-t border-slate-100">
          <div>
            <span className="text-xs text-outline">Giá chỉ từ</span>
            <div className="text-h2 text-primary">{flight.price}</div>
          </div>

          <button
            onClick={() =>
              navigate(`/bookings?from=${flight.fromCode}&to=${flight.toCode}`)
            }
            className="bg-primary text-white px-6 py-2 rounded-lg"
          >
            Đặt vé
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
