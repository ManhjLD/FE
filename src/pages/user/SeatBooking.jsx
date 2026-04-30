import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import {
  saveBookingSession,
  createBookingData,
} from "../../services/bookingLocalStore";
import "../../seat.css";

function SeatBooking() {
  // ===== HOOKS =====
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // ===== STATE =====
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [passengerName, setPassengerName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [residentId, setResidentId] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // ===== FLIGHT DATA (From URL Params) =====
  const fromCode = searchParams.get("from") || "SGN";
  const toCode = searchParams.get("to") || "HAN";
  const departureDate =
    searchParams.get("date") || searchParams.get("departureDate") || "";
  const departureTime =
    searchParams.get("time") || searchParams.get("departureTime") || "08:00";
  const flightDuration = Number(searchParams.get("duration")) || 130; // minutes
  const flightId =
    searchParams.get("flightId") || Math.floor(Math.random() * 10000);

  // ===== PRICING =====
  const seatPrice = 500000;
  const basePrice = 2150000; // Ticket price per passenger
  const takenSeats = [];

  // ===== HANDLE SELECT SEAT =====
  const handleSelectSeat = (seat, status) => {
    if (status === "taken") return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setTimeLeft(15 * 60);
    }
  };

  // ===== TIMER FOR SEAT HOLD =====
  useEffect(() => {
    if (selectedSeats.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          alert("Hết thời gian giữ ghế!");
          setSelectedSeats([]);
          return 15 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedSeats]);

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ===== HANDLE FORM SUBMIT =====
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ghế!");
      return;
    }

    // Calculate total amount
    const totalAmount = basePrice + seatPrice * selectedSeats.length;

    // Create booking data structure (aligned with DB schema)
    const bookingData = createBookingData({
      userId: user?.user_id,
      flightId: flightId,
      fromCode: fromCode,
      toCode: toCode,
      departureDate: departureDate,
      departureTime: departureTime,
      flightDuration: flightDuration,
      passengers: [
        {
          passengerName: passengerName,
          residentId: residentId,
        },
      ],
      selectedSeats: selectedSeats,
      totalAmount: totalAmount,
      branchCode: "CN01", // Default branch (TODO: Get from user context)
    });

    // Store booking session in localStorage for Payment page
    const result = saveBookingSession({
      ...bookingData,
      passengerEmail: passengerEmail,
      passengerPhone: passengerPhone,
    });

    if (result.success) {
      // Navigate to payment with booking ID
      navigate(`/payment?booking_id=${bookingData.booking_id}`);
    } else {
      alert("Lỗi khi lưu thông tin đặt vé. Vui lòng thử lại!");
    }
  };

  // ===== CALCULATE TOTAL =====
  const total = basePrice + seatPrice * selectedSeats.length;

  return (
    <>
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-xl font-jakarta bg-background">
        {/* STEP */}
        <div className="flex items-center justify-center mb-xxl space-x-4">
          <div className="flex items-center text-secondary">
            <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span className="ml-2 text-xs font-bold">CHỌN CHUYẾN BAY</span>
          </div>

          <div className="w-12 h-[2px] bg-secondary"></div>

          <div className="flex items-center text-primary">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
              2
            </span>
            <span className="ml-2 text-xs font-bold">CHỖ NGỒI & THÔNG TIN</span>
          </div>

          <div className="w-12 h-[2px] bg-gray-300"></div>

          <div className="flex items-center text-gray-400">
            <span className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-xs font-bold">
              3
            </span>
            <span className="ml-2 text-xs font-bold">THANH TOÁN</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-lg">
            {/* FLIGHT */}
            <section className="bg-white rounded-xl p-lg shadow-[0px_4px_12px_rgba(26,54,93,0.08)] border border-surface-variant">
              <div className="flex justify-between items-start mb-md">
                <div>
                  <span className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-[12px] font-bold mb-sm">
                    CHUYẾN BAY ĐÃ CHỌN
                  </span>

                  <h2 className="font-h3 text-h3 text-primary">
                    {fromCode} → {toCode}
                  </h2>

                  <p className="text-body-sm text-on-surface-variant">
                    Thứ Tư, 22 Tháng 5, 2026 • VN214 • Airbus A350
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-md border-t border-surface-variant">
                {/* Departure */}
                <div className="text-center">
                  <p className="text-h2 font-h2 text-primary">08:00</p>
                  <p className="text-body-sm font-bold">{fromCode}</p>
                </div>

                {/* Route */}
                <div className="flex flex-col items-center flex-grow px-lg">
                  <span className="text-body-sm text-outline mb-1">2h 10m</span>

                  <div className="w-full h-[2px] bg-outline-variant relative">
                    <span className="material-symbols-outlined absolute left-0 -top-[11px] text-outline text-[20px]">
                      radio_button_checked
                    </span>

                    <span className="material-symbols-outlined absolute right-0 -top-[11px] text-outline text-[20px]">
                      location_on
                    </span>

                    <span
                      className="material-symbols-outlined absolute left-1/2 -translate-x-1/2 -top-[11px] text-secondary text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      flight
                    </span>
                  </div>
                </div>

                {/* Arrival */}
                <div className="text-center">
                  <p className="text-h2 font-h2 text-primary">10:10</p>
                  <p className="text-body-sm font-bold">{toCode}</p>
                </div>
              </div>
            </section>

            {/* SEAT MAP */}
            <section className="bg-white rounded-xl p-lg shadow-card border border-surface-variant">
              <h2 className="text-lg font-bold mb-4 text-primary">
                Sơ đồ ghế ngồi
              </h2>

              {/* TIMER */}
              {selectedSeats.length > 0 && (
                <div className="mb-4 text-red-500 font-bold">
                  Giữ ghế ({selectedSeats.join(", ")}): {formatTime(timeLeft)}
                </div>
              )}

              {/* PLANE */}
              <div className="bg-slate-50 rounded-[40px_40px_20px_20px] border-x-4 border-t-4 border-slate-200 p-8 max-w-md mx-auto relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-16 bg-slate-200 rounded-t-full"></div>

                <div className="flex justify-center mb-8">
                  <div className="w-24 h-8 bg-slate-300 rounded-lg"></div>
                </div>

                <div className="space-y-4">
                  {Array.from({ length: 7 }).map((_, rowIndex) => {
                    const row = rowIndex + 1;
                    const rowSeats = [
                      `${row}A`,
                      `${row}B`,
                      `${row}C`,
                      `${row}D`,
                    ];

                    return (
                      <div
                        key={row}
                        className="grid grid-cols-5 items-center gap-3"
                      >
                        {/* LEFT */}
                        {rowSeats.slice(0, 2).map((seat) => {
                          const isTaken = takenSeats.includes(seat);
                          const isSelected = selectedSeats.includes(seat);

                          return (
                            <div
                              key={seat}
                              onClick={() =>
                                handleSelectSeat(
                                  seat,
                                  isTaken ? "taken" : "available",
                                )
                              }
                              className={`
                                w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm cursor-pointer transition-all
                                ${isTaken && "bg-gray-300 text-white cursor-not-allowed"}
                                ${!isTaken && !isSelected && "bg-gray-100 hover:bg-blue-400 hover:text-white"}
                                ${isSelected && "bg-orange-500 text-white scale-110"}
                              `}
                            >
                              {seat}
                            </div>
                          );
                        })}

                        <div className="text-center text-xs text-gray-400 font-bold">
                          |
                        </div>

                        {/* RIGHT */}
                        {rowSeats.slice(2).map((seat) => {
                          const isTaken = takenSeats.includes(seat);
                          const isSelected = selectedSeats.includes(seat);

                          return (
                            <div
                              key={seat}
                              onClick={() =>
                                handleSelectSeat(
                                  seat,
                                  isTaken ? "taken" : "available",
                                )
                              }
                              className={`
                                w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm cursor-pointer transition-all
                                ${isTaken && "bg-gray-300 text-white cursor-not-allowed"}
                                ${!isTaken && !isSelected && "bg-gray-100 hover:bg-blue-400 hover:text-white"}
                                ${isSelected && "bg-orange-500 text-white scale-110"}
                              `}
                            >
                              {seat}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-lg">
            {/* FORM */}
            <section className="bg-white rounded-xl p-lg shadow-[0px_4px_12px_rgba(26,54,93,0.08)] border border-surface-variant">
              <h2 className="font-h3 text-h3 text-primary mb-lg">
                Thông tin hành khách
              </h2>

              <form onSubmit={handleSubmit} className="space-y-md">
                {/* NAME */}
                <div>
                  <label className="block text-body-sm font-bold text-primary mb-2">
                    Họ và tên (như trên hộ chiếu)
                  </label>
                  <input
                    required
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full h-[56px] px-md border border-outline-variant rounded-lg 
          focus:ring-2 focus:ring-secondary focus:border-secondary 
          outline-none transition-all font-body-md uppercase"
                    placeholder="VD: NGUYEN VAN A"
                  />
                </div>

                {/* RESIDENT ID */}
                <div>
                  <label className="block text-body-sm font-bold text-primary mb-2">
                    Căn cước công dân
                  </label>
                  <input
                    required
                    value={residentId}
                    onChange={(e) => setResidentId(e.target.value)}
                    className="w-full h-[56px] px-md border border-outline-variant rounded-lg 
          focus:ring-2 focus:ring-secondary focus:border-secondary 
          outline-none transition-all font-body-md"
                    placeholder="VD: 123456789012"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-body-sm font-bold text-primary mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full h-[56px] px-md border border-outline-variant rounded-lg 
          focus:ring-2 focus:ring-secondary focus:border-secondary 
          outline-none transition-all font-body-md"
                    placeholder="example@email.com"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-body-sm font-bold text-primary mb-2">
                    Số điện thoại
                  </label>
                  <div className="flex">
                    <div className="h-[56px] px-3 bg-slate-50 border border-r-0 border-outline-variant rounded-l-lg flex items-center text-body-sm font-bold">
                      +84
                    </div>
                    <input
                      required
                      pattern="[0-9]{9,11}"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full h-[56px] px-md border border-outline-variant rounded-r-lg 
            focus:ring-2 focus:ring-secondary focus:border-secondary 
            outline-none transition-all font-body-md"
                      placeholder="987 654 321"
                    />
                  </div>
                </div>

                {/* TERMS */}
                <div className="flex items-start gap-3 pt-sm">
                  <input
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 text-secondary border-outline-variant rounded focus:ring-secondary"
                    type="checkbox"
                  />
                  <label className="text-body-sm text-on-surface-variant leading-tight">
                    Tôi đồng ý với Điều khoản và Chế độ bảo mật của Vietnam
                    Airways.
                  </label>
                </div>

                {/* BUTTON SUBMIT */}
                <button
                  type="submit"
                  className="w-full h-[56px] bg-[#ed8936] text-white font-button text-button rounded-lg 
        shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all 
        flex items-center justify-center gap-2"
                >
                  Thanh toán ngay
                </button>
              </form>
            </section>

            {/* SUMMARY */}
            <section className="bg-primary-container text-white rounded-xl p-lg shadow-[0px_8px_24px_rgba(26,54,93,0.12)] border border-primary relative overflow-hidden">
              {/* ICON */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]">
                  airplane_ticket
                </span>
              </div>

              <h3 className="font-h3 text-h3 mb-md relative z-10">
                Tóm tắt đơn hàng
              </h3>

              <div className="space-y-sm mb-lg relative z-10">
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-primary-container">
                    Giá vé (1 người lớn)
                  </span>
                  <span className="font-bold">
                    {basePrice.toLocaleString()} VND
                  </span>
                </div>

                <div className="flex justify-between text-body-sm">
                  <span className="text-on-primary-container">
                    Ghế đã chọn ({selectedSeats.join(", ") || "Chưa chọn"})
                  </span>
                  <span className="font-bold">
                    + {(selectedSeats.length * seatPrice).toLocaleString()} VND
                  </span>
                </div>

                <div className="pt-md border-t border-blue-800 flex justify-between items-end">
                  <span className="text-body-md">Tổng cộng</span>
                  <span className="text-h2 font-h2 text-tertiary-fixed">
                    {total.toLocaleString()} VND
                  </span>
                </div>
              </div>

              <p className="text-center text-[12px] mt-md text-on-primary-container">
                Giá đã bao gồm VAT
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default SeatBooking;
//           <div className="flex items-center text-secondary">
//             <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">
//               1
//             </span>
//             <span className="ml-2 text-xs font-bold">CHỌN CHUYẾN BAY</span>
//           </div>

//           <div className="w-12 h-[2px] bg-secondary"></div>

//           <div className="flex items-center text-primary">
//             <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
//               2
//             </span>
//             <span className="ml-2 text-xs font-bold">CHỖ NGỒI & THÔNG TIN</span>
//           </div>

//           <div className="w-12 h-[2px] bg-gray-300"></div>

//           <div className="flex items-center text-gray-400">
//             <span className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-xs font-bold">
//               3
//             </span>
//             <span className="ml-2 text-xs font-bold">THANH TOÁN</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
//           {/* LEFT */}
//           <div className="lg:col-span-2 space-y-lg">
//             {/* FLIGHT */}
//             <section className="bg-white rounded-xl p-lg shadow-[0px_4px_12px_rgba(26,54,93,0.08)] border border-surface-variant">
//               <div className="flex justify-between items-start mb-md">
//                 <div>
//                   <span className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-[12px] font-bold mb-sm">
//                     CHUYẾN BAY ĐÃ CHỌN
//                   </span>

//                   <h2 className="font-h3 text-h3 text-primary">
//                     TP. Hồ Chí Minh (SGN) → Hà Nội (HAN)
//                   </h2>

//                   <p className="text-body-sm text-on-surface-variant">
//                     Thứ Tư, 22 Tháng 5, 2024 • VN214 • Airbus A350
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-md border-t border-surface-variant">
//                 {/* Departure */}
//                 <div className="text-center">
//                   <p className="text-h2 font-h2 text-primary">08:00</p>
//                   <p className="text-body-sm font-bold">SGN</p>
//                 </div>

//                 {/* Route */}
//                 <div className="flex flex-col items-center flex-grow px-lg">
//                   <span className="text-body-sm text-outline mb-1">2h 10m</span>

//                   <div className="w-full h-[2px] bg-outline-variant relative">
//                     <span className="material-symbols-outlined absolute left-0 -top-[11px] text-outline text-[20px]">
//                       radio_button_checked
//                     </span>

//                     <span className="material-symbols-outlined absolute right-0 -top-[11px] text-outline text-[20px]">
//                       location_on
//                     </span>

//                     <span
//                       className="material-symbols-outlined absolute left-1/2 -translate-x-1/2 -top-[11px] text-secondary text-[24px]"
//                       style={{ fontVariationSettings: "'FILL' 1" }}
//                     >
//                       flight
//                     </span>
//                   </div>
//                 </div>

//                 {/* Arrival */}
//                 <div className="text-center">
//                   <p className="text-h2 font-h2 text-primary">10:10</p>
//                   <p className="text-body-sm font-bold">HAN</p>
//                 </div>
//               </div>
//             </section>

//             {/* SEAT MAP */}
//             <section className="bg-white rounded-xl p-lg shadow-card border border-surface-variant">
//               <h2 className="text-lg font-bold mb-4 text-primary">
//                 Sơ đồ ghế ngồi
//               </h2>

//               {/* TIMER */}
//               {selectedSeats.length > 0 && (
//                 <div className="mb-4 text-red-500 font-bold">
//                   Giữ ghế ({selectedSeats.join(", ")}): {formatTime(timeLeft)}
//                 </div>
//               )}

//               {/* PLANE */}
//               <div className="bg-slate-50 rounded-[40px_40px_20px_20px] border-x-4 border-t-4 border-slate-200 p-8 max-w-md mx-auto relative">
//                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-16 bg-slate-200 rounded-t-full"></div>

//                 <div className="flex justify-center mb-8">
//                   <div className="w-24 h-8 bg-slate-300 rounded-lg"></div>
//                 </div>

//                 <div className="space-y-4">
//                   {Array.from({ length: 7 }).map((_, rowIndex) => {
//                     const row = rowIndex + 1;
//                     const rowSeats = [
//                       `${row}A`,
//                       `${row}B`,
//                       `${row}C`,
//                       `${row}D`,
//                     ];

//                     return (
//                       <div
//                         key={row}
//                         className="grid grid-cols-5 items-center gap-3"
//                       >
//                         {/* LEFT */}
//                         {rowSeats.slice(0, 2).map((seat) => {
//                           const isTaken = takenSeats.includes(seat);
//                           const isSelected = selectedSeats.includes(seat);

//                           return (
//                             <div
//                               key={seat}
//                               onClick={() =>
//                                 handleSelectSeat(
//                                   seat,
//                                   isTaken ? "taken" : "available",
//                                 )
//                               }
//                               className={`
//                                 w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm cursor-pointer transition-all
//                                 ${isTaken && "bg-gray-300 text-white cursor-not-allowed"}
//                                 ${!isTaken && !isSelected && "bg-gray-100 hover:bg-blue-400 hover:text-white"}
//                                 ${isSelected && "bg-orange-500 text-white scale-110"}
//                               `}
//                             >
//                               {seat}
//                             </div>
//                           );
//                         })}

//                         <div className="text-center text-xs text-gray-400 font-bold">
//                           |
//                         </div>

//                         {/* RIGHT */}
//                         {rowSeats.slice(2).map((seat) => {
//                           const isTaken = takenSeats.includes(seat);
//                           const isSelected = selectedSeats.includes(seat);

//                           return (
//                             <div
//                               key={seat}
//                               onClick={() =>
//                                 handleSelectSeat(
//                                   seat,
//                                   isTaken ? "taken" : "available",
//                                 )
//                               }
//                               className={`
//                                 w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm cursor-pointer transition-all
//                                 ${isTaken && "bg-gray-300 text-white cursor-not-allowed"}
//                                 ${!isTaken && !isSelected && "bg-gray-100 hover:bg-blue-400 hover:text-white"}
//                                 ${isSelected && "bg-orange-500 text-white scale-110"}
//                               `}
//                             >
//                               {seat}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* RIGHT */}
//           <div className="space-y-lg">
//             {/* FORM */}
//             <section className="bg-white rounded-xl p-lg shadow-[0px_4px_12px_rgba(26,54,93,0.08)] border border-surface-variant">
//               <h2 className="font-h3 text-h3 text-primary mb-lg">
//                 Thông tin người mua
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-md">
//                 {/* NAME */}
//                 <div>
//                   <label className="block text-body-sm font-bold text-primary mb-2">
//                     Họ và tên (như trên hộ chiếu)
//                   </label>
//                   <input
//                     required
//                     className="w-full h-[56px] px-md border border-outline-variant rounded-lg
//           focus:ring-2 focus:ring-secondary focus:border-secondary
//           outline-none transition-all font-body-md uppercase"
//                     placeholder="VD: NGUYEN VAN A"
//                   />
//                 </div>

//                 {/* EMAIL */}
//                 <div>
//                   <label className="block text-body-sm font-bold text-primary mb-2">
//                     Email
//                   </label>
//                   <input
//                     required
//                     type="email"
//                     className="w-full h-[56px] px-md border border-outline-variant rounded-lg
//           focus:ring-2 focus:ring-secondary focus:border-secondary
//           outline-none transition-all font-body-md"
//                     placeholder="example@email.com"
//                   />
//                 </div>

//                 {/* PHONE */}
//                 <div>
//                   <label className="block text-body-sm font-bold text-primary mb-2">
//                     Số điện thoại
//                   </label>
//                   <div className="flex">
//                     <div className="h-[56px] px-3 bg-slate-50 border border-r-0 border-outline-variant rounded-l-lg flex items-center text-body-sm font-bold">
//                       +84
//                     </div>
//                     <input
//                       required
//                       pattern="[0-9]{9,11}"
//                       className="w-full h-[56px] px-md border border-outline-variant rounded-r-lg
//             focus:ring-2 focus:ring-secondary focus:border-secondary
//             outline-none transition-all font-body-md"
//                       placeholder="987 654 321"
//                     />
//                   </div>
//                 </div>

//                 {/* TERMS */}
//                 <div className="flex items-start gap-3 pt-sm">
//                   <input
//                     required
//                     className="mt-1 w-5 h-5 text-secondary border-outline-variant rounded focus:ring-secondary"
//                     type="checkbox"
//                   />
//                   <label className="text-body-sm text-on-surface-variant leading-tight">
//                     Tôi đồng ý với Điều khoản và Chế độ bảo mật của Vietnam
//                     Airways.
//                   </label>
//                 </div>

//                 {/* BUTTON SUBMIT */}
//                 <button
//                   type="submit"
//                   className="w-full h-[56px] bg-[#ed8936] text-white font-button text-button rounded-lg
//         shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all
//         flex items-center justify-center gap-2"
//                 >
//                   Thanh toán ngay
//                 </button>
//               </form>
//             </section>

//             {/* SUMMARY */}
//             <section className="bg-primary-container text-white rounded-xl p-lg shadow-[0px_8px_24px_rgba(26,54,93,0.12)] border border-primary relative overflow-hidden">
//               {/* ICON */}
//               <div className="absolute top-0 right-0 p-4 opacity-10">
//                 <span className="material-symbols-outlined text-[120px]">
//                   airplane_ticket
//                 </span>
//               </div>

//               <h3 className="font-h3 text-h3 mb-md relative z-10">
//                 Tóm tắt đơn hàng
//               </h3>

//               <div className="space-y-sm mb-lg relative z-10">
//                 <div className="flex justify-between text-body-sm">
//                   <span className="text-on-primary-container">
//                     Giá vé (1 người lớn)
//                   </span>
//                   <span className="font-bold">
//                     {basePrice.toLocaleString()} VND
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-body-sm">
//                   <span className="text-on-primary-container">
//                     Ghế đã chọn ({selectedSeats.join(", ") || "Chưa chọn"})
//                   </span>
//                   <span className="font-bold">
//                     + {(selectedSeats.length * seatPrice).toLocaleString()} VND
//                   </span>
//                 </div>

//                 {/* <div className="flex justify-between text-body-sm">
//                   <span className="text-on-primary-container">Thuế & Phí</span>
//                   <span className="font-bold">350,000 VND</span>
//                 </div> */}

//                 <div className="pt-md border-t border-blue-800 flex justify-between items-end">
//                   <span className="text-body-md">Tổng cộng</span>
//                   <span className="text-h2 font-h2 text-tertiary-fixed">
//                     {(
//                       basePrice +
//                       selectedSeats.length * seatPrice
//                     ).toLocaleString()}{" "}
//                     VND
//                   </span>
//                 </div>
//               </div>

//               <p className="text-center text-[12px] mt-md text-on-primary-container">
//                 Giá đã bao gồm VAT
//               </p>
//             </section>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }

// export default SeatBooking;
