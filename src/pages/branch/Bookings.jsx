import { useEffect, useState } from "react";
import {
  getBranchBookings,
  updateBranchBooking,
} from "@/services/branchService";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = filter !== "all" ? { status: filter } : {};
      const response = await getBranchBookings(params);
      setBookings(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBranchBooking(id, { status: newStatus });
      fetchBookings();
    } catch (err) {
      setError(err.message);
      console.error("Error updating booking:", err);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "0đ";
    return `${(value / 1000000).toFixed(1)}M`;
  };

  if (loading)
    return <div className="p-6 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-lg">
      <h1 className="text-h1 font-bold text-on-background mb-xl">
        Đặt vé
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Chờ xử lý
        </button>
        <button
          onClick={() => setFilter("confirmed")}
          className={`px-4 py-2 rounded ${
            filter === "confirmed"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Đã xác nhận
        </button>
        <button
          onClick={() => setFilter("cancelled")}
          className={`px-4 py-2 rounded ${
            filter === "cancelled"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Đã hủy
        </button>
      </div>

      <div className="space-y-md">
        {bookings.length > 0 ? (
          bookings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-soft-navy p-lg flex justify-between items-center hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="font-bold text-h2 text-primary-container">
                  {item.departure} → {item.arrival}
                </h3>

                <p className="text-body-md text-on-surface-variant mt-base">
                  Mã đặt vé: {item.id}
                </p>
                <p className="text-body-md text-on-surface-variant">
                  Khách: {item.customerName || "N/A"}
                </p>
                <p className="text-body-md text-on-surface-variant">
                  Ngày: {new Date(item.bookingDate).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <div className="text-right">
                <div className="font-bold text-h2 text-secondary-container mb-3">
                  {formatCurrency(item.amount)}
                </div>

                <select
                  value={item.status || "pending"}
                  onChange={(e) =>
                    handleStatusChange(item.id, e.target.value)
                  }
                  className={`px-3 py-1 rounded text-sm font-semibold border-0 cursor-pointer ${
                    item.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Không có đặt vé nào
          </div>
        )}
      </div>
    </div>
  );
}