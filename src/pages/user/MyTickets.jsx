import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  cancelTicketById,
  getTicketsByUser,
} from "../../services/bookingLocalStore";

const Profile = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [cancelingTicketId, setCancelingTicketId] = useState(null);
  const tickets = useMemo(
    () => getTicketsByUser(user?.user_id),
    [user?.user_id, refreshKey],
  );

  const cityByCode = {
    HAN: "Hà Nội",
    SGN: "TP.HCM",
    DAD: "Đà Nẵng",
    PQC: "Phú Quốc",
    CXR: "Nha Trang",
    HPH: "Hải Phòng",
  };

  const now = new Date();
  const getDepartureDateTime = (ticket) => {
    if (ticket.departure_datetime) {
      return new Date(ticket.departure_datetime);
    }

    if (ticket.departure_date && ticket.departure_time) {
      return new Date(`${ticket.departure_date}T${ticket.departure_time}:00`);
    }

    if (ticket.booking_date && ticket.departure_time) {
      const datePart = ticket.booking_date.slice(0, 10);
      return new Date(`${datePart}T${ticket.departure_time}:00`);
    }

    return new Date(ticket.booking_date);
  };

  const getArrivalDateTime = (ticket) => {
    if (ticket.arrival_datetime) {
      return new Date(ticket.arrival_datetime);
    }

    const dep = getDepartureDateTime(ticket);
    const duration = Number(
      ticket.flight_duration || ticket.flightDuration || 0,
    );
    if (!dep || !duration) return dep;

    const d = new Date(dep);
    d.setMinutes(d.getMinutes() + duration);
    return d;
  };

  const activeTickets = tickets.filter(
    (ticket) => ticket.status !== "cancelled",
  );
  // Upcoming: now is before arrival time → flight not finished
  const upcomingList = activeTickets.filter((ticket) => {
    const arrival = getArrivalDateTime(ticket);
    return arrival ? arrival > now : getDepartureDateTime(ticket) >= now;
  });

  // Completed: now is on/after arrival time
  const completedList = activeTickets.filter((ticket) => {
    const arrival = getArrivalDateTime(ticket);
    return arrival ? arrival <= now : getDepartureDateTime(ticket) < now;
  });

  const totalTickets = activeTickets.length;
  const upcomingTickets = upcomingList.length;
  const points = totalTickets * 380;

  const handleCancelTicket = (ticketId) => {
    const ok = window.confirm("Bạn có chắc muốn hủy vé này?");
    if (!ok) {
      return;
    }

    const result = cancelTicketById({ ticketId, userId: user?.user_id });
    if (!result.success) {
      alert("Hủy vé thất bại. Vui lòng thử lại.");
      return;
    }

    setRefreshKey((prev) => prev + 1);
  };

  const handleLogout = () => {
    logout(); // clear auth
    navigate("/"); // redirect về home/login
  };

  const menu = [
    {
      label: "Thông tin cá nhân",
      icon: "person",
      path: "/profile",
    },
    {
      label: "Vé của tôi",
      icon: "confirmation_number",
      path: "/my-tickets",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-72">
          <div className="bg-white p-4 rounded-xl shadow border space-y-2">
            {/* User info */}
            <div className="pb-4 mb-4 border-b px-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#002045]">
                    {user?.name || "Nguyễn Văn A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}

            {/* Logout */}
            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full px-4 py-3 rounded-lg transition"
              >
                <span className="material-symbols-outlined">logout</span>
                Đăng xuất
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vé của tôi</h1>
            <p className="text-gray-500 text-sm">
              Quản lý các chuyến bay của bạn
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-600">
              <p className="text-xs text-gray-500">Tổng vé</p>
              <p className="text-xl font-bold text-blue-600">{totalTickets}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-orange-500">
              <p className="text-xs text-gray-500">Sắp tới</p>
              <p className="text-xl font-bold text-orange-500">
                {upcomingTickets}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
              <p className="text-xs text-gray-500">Điểm</p>
              <p className="text-xl font-bold text-green-500">
                {points.toLocaleString()}
              </p>
            </div>
          </div>

          {activeTickets.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-5 text-sm text-gray-500">
              Bạn chưa có vé nào. Hãy đặt chuyến bay để vé hiển thị tại đây.
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Vé sắp bay
                </h2>
                {upcomingList.length === 0 ? (
                  <div className="bg-white rounded-xl shadow p-5 text-sm text-gray-500">
                    Không có vé sắp tới.
                  </div>
                ) : (
                  upcomingList.map((ticket) => (
                    <div
                      key={ticket.ticket_id}
                      className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row justify-between gap-4"
                    >
                      <div className="flex gap-4">
                        <span className="material-symbols-outlined text-blue-600 text-3xl">
                          flight_takeoff
                        </span>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {cityByCode[ticket.from_code] || ticket.from_code} →{" "}
                            {cityByCode[ticket.to_code] || ticket.to_code}
                          </p>

                          <p className="text-sm text-gray-500">
                            {getDepartureDateTime(ticket).toLocaleDateString(
                              "vi-VN",
                            )}{" "}
                            • {ticket.departure_time || "08:00"} • Ghế{" "}
                            {ticket.selected_seats?.join(", ") || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                          Đã thanh toán
                        </span>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                          Mã đặt chỗ: {ticket.booking_id}
                        </button>

                        <button
                          onClick={() => setCancelingTicketId(ticket.ticket_id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          Hủy vé
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cancel confirmation modal */}
              {cancelingTicketId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="bg-white rounded-lg p-6 z-10 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-4">
                      Xác nhận hủy vé
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Bạn có chắc muốn hủy vé này? Khi hủy, quý khách sẽ không
                      được hoàn trả phí đã thanh toán.
                    </p>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setCancelingTicketId(null)}
                        className="px-4 py-2 rounded-lg bg-gray-100"
                      >
                        Quay lại
                      </button>

                      <button
                        onClick={async () => {
                          const result = cancelTicketById({
                            ticketId: cancelingTicketId,
                            userId: user?.user_id,
                          });

                          if (!result.success) {
                            alert("Hủy vé thất bại. Vui lòng thử lại.");
                            return;
                          }

                          setCancelingTicketId(null);
                          setRefreshKey((p) => p + 1);
                        }}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Vé đã bay
                </h2>
                {completedList.length === 0 ? (
                  <div className="bg-white rounded-xl shadow p-5 text-sm text-gray-500">
                    Không có vé đã đặt.
                  </div>
                ) : (
                  completedList.map((ticket) => (
                    <div
                      key={ticket.ticket_id}
                      className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row justify-between gap-4"
                    >
                      <div className="flex gap-4">
                        <span className="material-symbols-outlined text-blue-600 text-3xl">
                          flight_takeoff
                        </span>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {cityByCode[ticket.from_code] || ticket.from_code} →{" "}
                            {cityByCode[ticket.to_code] || ticket.to_code}
                          </p>

                          <p className="text-sm text-gray-500">
                            {getDepartureDateTime(ticket).toLocaleDateString(
                              "vi-VN",
                            )}{" "}
                            • {ticket.departure_time || "08:00"} • Ghế{" "}
                            {ticket.selected_seats?.join(", ") || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
                          Đã đặt
                        </span>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                          Mã đặt chỗ: {ticket.booking_id}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
