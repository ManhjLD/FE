import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  getBookingSession,
  createPaymentData,
  clearBookingSession,
  savePaidTicket,
} from "../../services/bookingLocalStore";
import { createPayment } from "../../services/paymentService";
import { createBooking } from "../../services/bookingService";
import { USE_BACKEND_API } from "../../config/apiConfig";
import { useAuth } from "../../context/AuthContext";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // ===== STATE =====
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ===== LOAD BOOKING SESSION =====
  useEffect(() => {
    try {
      const bookingIdParam = searchParams.get("booking_id");
      const bookingData = getBookingSession();

      if (!bookingData || !bookingIdParam) {
        navigate("/bookings");
        return;
      }

      setBooking(bookingData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading booking:", error);
      navigate("/bookings");
    }
  }, [searchParams, navigate]);

  // ===== HANDLE PAYMENT =====
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!booking) {
      alert("Không tìm thấy thông tin đặt vé!");
      return;
    }

    setIsProcessing(true);

    try {
      const bookingId = booking.bookingId || booking.booking_id;
      const amount = booking.totalAmount || booking.total_amount;
      const userId = user?.user_id;

      if (USE_BACKEND_API) {
        // ============ API MODE ============
        // 1. Create booking
        const bookingResponse = await createBooking({
          maCn: booking.maCn || "CN01",
          flightId: booking.flightId || booking.flight_id,
          passengerName:
            booking.passengers?.[0]?.passengerName ||
            booking.passengers?.[0]?.passenger_name,
          residentId:
            booking.passengers?.[0]?.residentId ||
            booking.passengers?.[0]?.resident_id,
          amount: amount,
          paymentMethod: paymentMethod,
        });

        if (!bookingResponse.success || !bookingResponse.data?.bookingId) {
          throw new Error(bookingResponse.message || "Tạo đơn đặt thất bại");
        }

        const createdBookingId = bookingResponse.data.bookingId;

        // 2. Create payment
        const paymentResponse = await createPayment({
          maCn: booking.maCn || "CN01",
          bookingId: createdBookingId,
          amount: amount,
          paymentMethod: paymentMethod,
          paymentStatus: "success",
        });

        if (!paymentResponse.success || !paymentResponse.data?.paymentId) {
          throw new Error(paymentResponse.message || "Tạo thanh toán thất bại");
        }

        clearBookingSession();
        alert(
          `Thanh toán thành công!\nMã đơn đặt: ${createdBookingId}\n\nVui lòng kiểm tra email để xem thông tin vé`,
        );
        navigate("/my-tickets");
        // ==================================
      } else {
        // ============ DEMO MODE (Local) ============
        console.log("[DEMO MODE] Processing payment locally...");

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Create payment data
        const paymentData = createPaymentData(bookingId, amount, paymentMethod);

        // Save ticket to localStorage
        const ticketResult = savePaidTicket({
          booking,
          payment: {
            ...paymentData,
            paymentStatus: "success",
          },
          userId: userId,
        });

        if (!ticketResult.success) {
          throw new Error(ticketResult.error || "Không thể lưu vé");
        }

        clearBookingSession();
        alert(
          `Thanh toán thành công!\nMã đơn đặt: ${bookingId}\n\nVui lòng kiểm tra email để xem thông tin vé`,
        );
        navigate("/my-tickets");
        // ==================================
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Lỗi khi xử lý thanh toán. Vui lòng thử lại!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p>Đang tải thông tin...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p>Không tìm thấy thông tin đặt vé</p>
        </main>
        <Footer />
      </>
    );
  }

  // Support both camelCase (API) and snake_case (local) fields
  const total = booking.totalAmount || booking.total_amount || 0;
  const displayPassengerName =
    booking.passengers?.[0]?.passengerName ||
    booking.passengers?.[0]?.passenger_name ||
    user?.name ||
    "Chưa cập nhật";
  const displayPassengerEmail =
    booking.passengerEmail || user?.email || "Chưa cập nhật";
  const displayPassengerPhone =
    booking.passengerPhone || user?.phone || "Chưa cập nhật";
  const displayResidentId =
    booking.passengers?.[0]?.residentId ||
    booking.passengers?.[0]?.resident_id ||
    user?.residentId ||
    "Chưa cập nhật";
  const fromCode = booking.fromCode || booking.from_code;
  const toCode = booking.toCode || booking.to_code;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 text-gray-900">
        {/* STEP */}
        <div className="flex items-center justify-center mb-xxl space-x-4">
          <div className="flex items-center text-secondary">
            <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span className="ml-2 text-xs font-bold">CHỌN CHUYẾN BAY</span>
          </div>

          <div className="w-12 h-[2px] bg-secondary"></div>

          <div className="flex items-center text-secondary">
            <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">
              2
            </span>
            <span className="ml-2 text-xs font-bold">CHỖ NGỒI & THÔNG TIN</span>
          </div>

          <div className="w-12 h-[2px] bg-secondary"></div>

          <div className="flex items-center text-primary">
            <span className="w-8 h-8 rounded-full bg-primary border-primary text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            <span className="ml-2 text-xs font-bold">THANH TOÁN</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6">
            {/* Flight Summary */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-900">
                  Tóm tắt chuyến bay
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <img
                  className="w-24 h-24 rounded-lg object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO1W53J0NN9pGIDNq85sjjmAMVoT9VJs931N8NbbwU7uXwkFohxkpWR3nfEcz3TZd5ljqxHPdual8jcjQerAzxQeZg9HhSNBPx3BQc7VhoioZ2pzhzbuS8Y8IsOQG9bB1eE7Li3JrlRi_FN5NAZ81qZxk1VWCM7hcsJKPV0mpl3pGWLv1XQ_9ACzfQC_SCbe8_bjAdzViDreFTdWj_ePcvoE0QI-50yl-yuwyySq5DjoYWc4QR2Bj04YVugcFlGN9IBhvyvq9IBB4D"
                  alt="plane"
                />

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-900">08:00</p>
                      <p className="text-sm text-gray-500">
                        {booking.from_code} (Hà Nội)
                      </p>
                    </div>

                    <div className="flex flex-col items-center px-6">
                      <span className="text-sm text-gray-500">2h 10m</span>
                      <div className="w-24 h-[2px] bg-gray-300 my-1 relative">
                        <span className="absolute -right-1 -top-[6px] text-xs text-gray-500">
                          →
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">Bay thẳng</span>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-900">10:10</p>
                      <p className="text-sm text-gray-500">
                        {booking.to_code} (TP. HCM)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Ghế đã chọn:</strong>{" "}
                  {booking.selected_seats?.join(", ") || "N/A"}
                </p>
              </div>
            </div>

            {/* Passenger */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Thông tin hành khách
              </h2>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                  👤
                </div>
                <div>
                  <p className="font-semibold text-blue-900">
                    {displayPassengerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayPassengerEmail}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">CCCD</p>
                  <p className="font-semibold text-gray-900">
                    {displayResidentId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ĐIỆN THOẠI</p>
                  <p className="font-semibold text-gray-900">
                    {displayPassengerPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Phương thức thanh toán
              </h2>

              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-3">
                  <label
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
                    style={{
                      borderColor:
                        paymentMethod === "qr_code" ? "#1a365d" : "#e5e7eb",
                      backgroundColor:
                        paymentMethod === "qr_code" ? "#f0f9ff" : "white",
                    }}
                  >
                    <input
                      type="radio"
                      value="qr_code"
                      checked={paymentMethod === "qr_code"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-semibold text-blue-900">
                      Thanh toán QR Code
                    </span>
                  </label>

                  <label
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
                    style={{
                      borderColor:
                        paymentMethod === "credit_card" ? "#1a365d" : "#e5e7eb",
                      backgroundColor:
                        paymentMethod === "credit_card" ? "#f0f9ff" : "white",
                    }}
                  >
                    <input
                      type="radio"
                      value="credit_card"
                      checked={paymentMethod === "credit_card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-semibold text-blue-900">
                      Thẻ tín dụng / Ghi nợ
                    </span>
                  </label>

                  <label
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
                    style={{
                      borderColor:
                        paymentMethod === "bank_transfer"
                          ? "#1a365d"
                          : "#e5e7eb",
                      backgroundColor:
                        paymentMethod === "bank_transfer" ? "#f0f9ff" : "white",
                    }}
                  >
                    <input
                      type="radio"
                      value="bank_transfer"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-semibold text-blue-900">
                      Chuyển khoản ngân hàng
                    </span>
                  </label>
                </div>

                {paymentMethod === "qr_code" && (
                  <div className="p-6 bg-gray-50 rounded-xl border text-center">
                    <p className="font-semibold text-blue-900 mb-4">
                      Quét mã QR để thanh toán
                    </p>
                    <div className="w-48 h-48 mx-auto bg-white border flex items-center justify-center">
                      <span className="text-4xl opacity-30">QR</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Hỗ trợ: MoMo, ZaloPay, và các ứng dụng ngân hàng khác
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-all"
                >
                  {isProcessing ? "Đang xử lý..." : "Hoàn tất thanh toán"}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 bg-white rounded-xl shadow-lg border overflow-hidden">
              <div className="bg-blue-900 p-4 text-white font-bold text-lg">
                Chi tiết giá
              </div>

              <div className="p-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Vé máy bay</span>
                  <span className="font-semibold">
                    {subtotal.toLocaleString()} VND
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Chọn chỗ ({booking.selected_seats?.length || 0} ghế)
                  </span>
                  <span className="font-semibold">
                    + {seatFee.toLocaleString()} VND
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Thuế & Phí</span>
                  <span className="font-semibold">
                    + {baseTax.toLocaleString()} VND
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-bold text-gray-900">TỔNG</span>
                  <span className="text-orange-500 font-bold text-xl">
                    {(total + baseTax).toLocaleString()} VND
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 border-t text-xs text-gray-600">
                <p>✓ Giá đã bao gồm VAT</p>
                <p>✓ Hóa đơn điện tử sẽ gửi qua email</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Payment;
