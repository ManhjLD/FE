import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { searchFlights } from "../../services/flightService";
import { useNavigate } from "react-router-dom";

// Danh sách 10 chi nhánh/sân bay tại Việt Nam
const BRANCHES = [
  { id: "NB", name: "Nội Bài", city: "Hà Nội", code: "HN" },
  { id: "DN", name: "Đà Nẵng", city: "Đà Nẵng", code: "ĐN" },
  {
    id: "TSN",
    name: "Tân Sơn Nhất",
    city: "TP.HCM",
    code: "TP.HCM",
  },
  { id: "PB", name: "Phú Bài", city: "Huế", code: "TT" },
  { id: "CB", name: "Cát Bi", city: "Hải Phòng", code: "HP" },
  { id: "CR", name: "Cam Ranh", city: "Cam Ranh", code: "KH" },
  { id: "CT", name: "Cần Thơ", city: "Cần Thơ", code: "CT" },
  { id: "PQ", name: "Phú Quốc", city: "Phú Quốc", code: "KG" },
  { id: "LK", name: "Liên Khương", city: "Đà Lạt", code: "LĐ" },
  { id: "VH", name: "Vinh", city: "Vinh", code: "NA" },
];

// Demo data - Dữ liệu mẫu để test trước khi kết nối backend
const DEMO_FLIGHTS = [
  {
    id: 1,
    flight_number: "VN001",
    departure: "HN",
    arrival: "TP.HCM",
    date: "2026-05-01",
    departure_time: "07:00",
    arrival_time: "09:30",
    flight_duration: "2h 30m",
    aircraft_type: "Boeing 787",
    available_seats: 45,
    price: 1200000,
  },
  {
    id: 2,
    flight_number: "VN002",
    departure: "HN",
    arrival: "TP.HCM",
    date: "2026-05-01",
    departure_time: "10:00",
    arrival_time: "12:30",
    flight_duration: "2h 30m",
    aircraft_type: "Airbus A320",
    available_seats: 28,
    price: 1150000,
  },
  {
    id: 3,
    flight_number: "VN003",
    departure: "HN",
    arrival: "TP.HCM",
    date: "2026-05-01",
    departure_time: "14:00",
    arrival_time: "16:30",
    flight_duration: "2h 30m",
    aircraft_type: "Boeing 737",
    available_seats: 0,
    price: 1100000,
  },
  {
    id: 4,
    flight_number: "VN004",
    departure: "HN",
    arrival: "ĐN",
    date: "2026-05-01",
    departure_time: "08:00",
    arrival_time: "10:00",
    flight_duration: "2h",
    aircraft_type: "Airbus A321",
    available_seats: 32,
    price: 950000,
  },
  {
    id: 5,
    flight_number: "VN005",
    departure: "HN",
    arrival: "ĐN",
    date: "2026-05-02",
    departure_time: "09:00",
    arrival_time: "11:00",
    flight_duration: "2h",
    aircraft_type: "Boeing 787",
    available_seats: 50,
    price: 950000,
  },
  {
    id: 6,
    flight_number: "VN006",
    departure: "TP.HCM",
    arrival: "HN",
    date: "2026-05-01",
    departure_time: "11:00",
    arrival_time: "13:30",
    flight_duration: "2h 30m",
    aircraft_type: "Airbus A320",
    available_seats: 18,
    price: 1200000,
  },
  {
    id: 7,
    flight_number: "VN007",
    departure: "ĐN",
    arrival: "HN",
    date: "2026-05-02",
    departure_time: "13:00",
    arrival_time: "15:00",
    flight_duration: "2h",
    aircraft_type: "Boeing 737",
    available_seats: 55,
    price: 950000,
  },
];

function SearchFlights() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    departure: "HN",
    arrival: "TP.HCM",
    date: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm lọc dữ liệu demo
  const filterDemoFlights = (departure, arrival, date) => {
    let filtered = DEMO_FLIGHTS.filter(
      (flight) => flight.departure === departure && flight.arrival === arrival,
    );

    if (date) {
      filtered = filtered.filter((flight) => flight.date === date);
    }

    return filtered;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!form.departure || !form.arrival) {
      setError("Vui lòng chọn điểm khởi hành và điểm đến.");
      return;
    }

    if (form.departure === form.arrival) {
      setError("Điểm khởi hành và điểm đến không được trùng nhau.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      // ========== DEMO MODE: Lọc từ dữ liệu local ==========
      const data = filterDemoFlights(form.departure, form.arrival, form.date);
      setResults(Array.isArray(data) ? data : []);

      if (Array.isArray(data) && data.length === 0) {
        setError("Không tìm thấy chuyến bay phù hợp.");
      }

      // ========== API MODE (Comment lại khi cần backend): ==========
      // const params = {
      //   departure: form.departure,
      //   arrival: form.arrival,
      // };
      // if (form.date) {
      //   params.date = form.date;
      // }
      // const response = await searchFlights(params);
      // const data = response.data?.data || response.data || [];
      // setResults(Array.isArray(data) ? data : []);
      // if (Array.isArray(data) && data.length === 0) {
      //   setError("Không tìm thấy chuyến bay phù hợp.");
      // }
      // ========== END API MODE ==========
    } catch (err) {
      setError("Lỗi khi tìm kiếm chuyến bay. Vui lòng thử lại.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getDepartureBranch = () =>
    BRANCHES.find((b) => b.code === form.departure);
  const getArrivalBranch = () => BRANCHES.find((b) => b.code === form.arrival);

  return (
    <>
      {/* <Navbar /> */}

      {/* Hero Search Section */}
      <section className="relative min-h-[500px] flex items-center justify-center pt-xxl pb-xxl px-6 overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0">
          <img
            alt="Vietnam Airways Aircraft"
            className="w-full h-full object-cover opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXYUPqF71CE2inxfLrnHWqFisKNbswtP9qAq0lcqsl601ETPLJCY1byztuMohZqs9j605OzkH_4vaaUpIGWDxMo53TqpUA8lFQhvtRWCm0MCdpeXtqa7cX2zQVw3t4SBkZuhmXaHvRq014wx3dP852S6wreEWwJEgkVlP3DluBpFTqf4ex8GfGYkWlAQ-8KWnR6Rx6wBa_MMQYh1zMNS9A8d1qjDHzBAw2JZOY_jJGAERoT4fY_X-Xr2YxoRJ1XcBqrtImxNxzspid"
          />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto">
          <div className="mb-xl text-center md:text-left">
            <h1 className="font-h1 text-h1 text-white mb-sm">
              Khám phá thế giới cùng Vietnam Airways
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl text-white">
              Trải nghiệm dịch vụ đẳng cấp 4 sao trên mỗi chuyến bay của chúng
              tôi.
            </p>
          </div>

          {/* Flight Search Card */}
          <div className="bg-white rounded-xl shadow-2xl p-md md:p-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Departure */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                Điểm khởi hành
              </label>
              <div className="flex items-center border border-outline-variant rounded-lg p-sm focus-within:border-secondary transition-all h-[56px]">
                <span className="material-symbols-outlined text-outline mr-2">
                  flight_takeoff
                </span>
                <select
                  name="departure"
                  value={form.departure}
                  onChange={handleChange}
                  className="w-full border-none focus:ring-0 text-body-md font-body-md text-primary bg-transparent"
                >
                  {BRANCHES.map((branch) => (
                    <option key={branch.code} value={branch.code}>
                      {branch.name} ({branch.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Arrival */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                Điểm đến
              </label>
              <div className="flex items-center border border-outline-variant rounded-lg p-sm focus-within:border-secondary transition-all h-[56px]">
                <span className="material-symbols-outlined text-outline mr-2">
                  flight_land
                </span>
                <select
                  name="arrival"
                  value={form.arrival}
                  onChange={handleChange}
                  className="w-full border-none focus:ring-0 text-body-md font-body-md text-primary bg-transparent"
                >
                  {BRANCHES.map((branch) => (
                    <option key={branch.code} value={branch.code}>
                      {branch.name} ({branch.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                Ngày đi
              </label>
              <div className="flex items-center border border-outline-variant rounded-lg p-sm focus-within:border-secondary transition-all h-[56px]">
                <span className="material-symbols-outlined text-outline mr-2">
                  calendar_month
                </span>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border-none focus:ring-0 text-body-md font-body-md text-primary bg-transparent"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#ed8936] text-white h-[56px] rounded-lg font-button text-button shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">
                {loading ? "hourglass_empty" : "search"}
              </span>
              {loading ? "Đang tìm..." : "Tìm chuyến bay"}
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {searched && (
        <section className="py-xl px-6 bg-gray-50">
          <div className="max-w-container-max mx-auto">
            {/* Search Info */}
            <div className="mb-lg p-md bg-white rounded-lg border border-outline-variant">
              <h2 className="font-h2 text-h2 text-primary mb-sm">
                Kết quả tìm kiếm
              </h2>
              <p className="text-body-md text-outline">
                {getDepartureBranch()?.name} ({form.departure}) →{" "}
                {getArrivalBranch()?.name} ({form.arrival})
                {form.date && (
                  <>
                    {" "}
                    vào ngày <span className="font-semibold">{form.date}</span>
                  </>
                )}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-lg p-md bg-red-100 border border-red-300 rounded-lg text-red-700 font-body-md">
                {error}
              </div>
            )}

            {/* Results List */}
            {!loading && results.length > 0 && (
              <div className="space-y-md">
                {results.map((flight, idx) => (
                  <div
                    key={flight.id || idx}
                    className="bg-white p-md md:p-lg rounded-xl shadow border border-outline-variant hover:shadow-lg transition-shadow"
                  >
                    <div className="grid md:grid-cols-4 gap-md items-center">
                      {/* Flight Info */}
                      <div>
                        <p className="text-xs text-outline uppercase font-semibold mb-xs">
                          Chuyến bay
                        </p>
                        <p className="text-h3 font-semibold text-primary">
                          {flight.flight_number || "N/A"}
                        </p>
                        <p className="text-sm text-outline mt-xs">
                          {flight.aircraft_type || ""}
                        </p>
                      </div>

                      {/* Schedule */}
                      <div>
                        <p className="text-xs text-outline uppercase font-semibold mb-xs">
                          Thời gian
                        </p>
                        <p className="font-semibold text-primary">
                          {flight.departure_time || "---"} →{" "}
                          {flight.arrival_time || "---"}
                        </p>
                        <p className="text-sm text-outline mt-xs">
                          {flight.flight_duration || ""}
                        </p>
                      </div>

                      {/* Availability */}
                      <div>
                        <p className="text-xs text-outline uppercase font-semibold mb-xs">
                          Ghế trống
                        </p>
                        <p
                          className={`text-h3 font-semibold ${
                            flight.available_seats > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {flight.available_seats || 0}
                        </p>
                      </div>

                      {/* Price & Action */}
                      <div className="flex flex-col gap-md">
                        <div>
                          <p className="text-xs text-outline uppercase font-semibold mb-xs">
                            Giá vé
                          </p>
                          <p className="text-h3 font-semibold text-[#ed8936]">
                            {flight.price
                              ? `${flight.price.toLocaleString("vi-VN")} ₫`
                              : "N/A"}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            navigate(
                              `/bookings?from=${flight.departure}&to=${flight.arrival}`,
                            )
                          }
                          disabled={!flight.available_seats}
                          className="px-md py-sm bg-[#ed8936] text-white rounded-lg font-button text-button hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Đặt vé
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && results.length === 0 && (
              <div className="text-center py-xl">
                <p className="text-body-lg text-outline mb-md">
                  {error || "Không tìm thấy kết quả"}
                </p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-xl">
                <p className="text-body-lg text-outline">Đang tìm kiếm...</p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

export default SearchFlights;
