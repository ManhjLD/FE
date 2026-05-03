import { useEffect, useState } from "react";
import {
  getAdminRevenueReport,
  getAdminUsersReport,
  getAdminFlightsReport,
  getAdminBookingsReport,
} from "@/services/adminService";

export default function Reports() {
  const [revenueReport, setRevenueReport] = useState([]);
  const [usersReport, setUsersReport] = useState(null);
  const [flightsReport, setFlightsReport] = useState(null);
  const [bookingsReport, setBookingsReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("revenue");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const [revenueRes, usersRes, flightsRes, bookingsRes] =
          await Promise.all([
            getAdminRevenueReport(),
            getAdminUsersReport(),
            getAdminFlightsReport(),
            getAdminBookingsReport(),
          ]);

        setRevenueReport(revenueRes?.data || []);
        setUsersReport(usersRes?.data);
        setFlightsReport(flightsRes?.data);
        setBookingsReport(bookingsRes?.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading)
    return <div className="p-10 text-center">Đang tải báo cáo...</div>;

  const formatCurrency = (value) => {
    if (!value) return "0đ";
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    return `${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="p-lg">
      <h1 className="text-h1 font-bold text-on-background mb-xl">
        Báo cáo toàn cục
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("revenue")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === "revenue"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Doanh thu
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === "users"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Người dùng
        </button>
        <button
          onClick={() => setActiveTab("flights")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === "flights"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Chuyến bay
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === "bookings"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Đặt vé
        </button>
      </div>

      {activeTab === "revenue" && (
        <div className="bg-white rounded-lg shadow-soft-navy p-lg">
          {revenueReport.length > 0 ? (
            revenueReport.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-md border-b border-outline-variant last:border-none items-center hover:bg-surface-container px-md transition-colors"
              >
                <span className="text-body-md text-on-surface font-semibold">
                  {item.branchName || item.branch}
                </span>
                <div className="text-right">
                  <div className="text-h3 font-bold text-secondary-container">
                    {formatCurrency(item.totalRevenue || item.revenue)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {item.bookingCount} vé
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Không có dữ liệu
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && usersReport && (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Tổng user</p>
            <h2 className="text-3xl font-bold">
              {usersReport?.totalUsers || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">User hoạt động</p>
            <h2 className="text-3xl font-bold">
              {usersReport?.activeUsers || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">User mới</p>
            <h2 className="text-3xl font-bold">
              {usersReport?.newUsers || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">User admin</p>
            <h2 className="text-3xl font-bold">
              {usersReport?.adminCount || 0}
            </h2>
          </div>
        </div>
      )}

      {activeTab === "flights" && flightsReport && (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Tổng chuyến bay</p>
            <h2 className="text-3xl font-bold">
              {flightsReport?.totalFlights || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Chuyến bay hôm nay</p>
            <h2 className="text-3xl font-bold">
              {flightsReport?.todayFlights || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Tuyến bay</p>
            <h2 className="text-3xl font-bold">
              {flightsReport?.routeCount || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Ghế trung bình</p>
            <h2 className="text-3xl font-bold">
              {Math.round(flightsReport?.averageSeats || 0)}
            </h2>
          </div>
        </div>
      )}

      {activeTab === "bookings" && bookingsReport && (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Tổng đặt vé</p>
            <h2 className="text-3xl font-bold">
              {bookingsReport?.totalBookings || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Đã xác nhận</p>
            <h2 className="text-3xl font-bold text-green-600">
              {bookingsReport?.confirmedBookings || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Chờ xử lý</p>
            <h2 className="text-3xl font-bold text-yellow-600">
              {bookingsReport?.pendingBookings || 0}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Đã hủy</p>
            <h2 className="text-3xl font-bold text-red-600">
              {bookingsReport?.cancelledBookings || 0}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}