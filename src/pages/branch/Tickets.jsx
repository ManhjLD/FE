import { useEffect, useState } from "react";
import {
  getBranchTickets,
  createBranchTicket,
  updateBranchTicket,
  deleteBranchTicket,
} from "@/services/branchService";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState({
    bookingId: "",
    flightCode: "",
    seatNumber: "",
    passengerName: "",
    price: "",
    status: "issued",
  });

  useEffect(() => {
    fetchTickets();
  }, [filterStatus]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = filterStatus !== "all" ? { status: filterStatus } : {};
      const response = await getBranchTickets(params);
      setTickets(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBranchTicket(editingId, formData);
      } else {
        await createBranchTicket(formData);
      }
      setFormData({
        bookingId: "",
        flightCode: "",
        seatNumber: "",
        passengerName: "",
        price: "",
        status: "issued",
      });
      setEditingId(null);
      setShowForm(false);
      fetchTickets();
    } catch (err) {
      setError(err.message);
      console.error("Error saving ticket:", err);
    }
  };

  const handleEdit = (ticket) => {
    setFormData({
      bookingId: ticket.bookingId,
      flightCode: ticket.flightCode,
      seatNumber: ticket.seatNumber,
      passengerName: ticket.passengerName,
      price: ticket.price,
      status: ticket.status,
    });
    setEditingId(ticket.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa vé này?")) {
      try {
        await deleteBranchTicket(id);
        fetchTickets();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting ticket:", err);
      }
    }
  };

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">Quản lý vé</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded ${
              filterStatus === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterStatus("issued")}
            className={`px-4 py-2 rounded ${
              filterStatus === "issued"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Đã phát hành
          </button>
          <button
            onClick={() => setFilterStatus("cancelled")}
            className={`px-4 py-2 rounded ${
              filterStatus === "cancelled"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Đã hủy
          </button>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              bookingId: "",
              flightCode: "",
              seatNumber: "",
              passengerName: "",
              price: "",
              status: "issued",
            });
          }}
          className="bg-blue-900 text-white px-5 py-3 rounded hover:bg-blue-800"
        >
          + {showForm ? "Hủy" : "Thêm vé"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ID Đặt vé"
              value={formData.bookingId}
              onChange={(e) =>
                setFormData({ ...formData, bookingId: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Mã chuyến bay"
              value={formData.flightCode}
              onChange={(e) =>
                setFormData({ ...formData, flightCode: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Số ghế"
              value={formData.seatNumber}
              onChange={(e) =>
                setFormData({ ...formData, seatNumber: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Tên hành khách"
              value={formData.passengerName}
              onChange={(e) =>
                setFormData({ ...formData, passengerName: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Giá vé"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="issued">Đã phát hành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingId ? "Cập nhật" : "Thêm mới"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Đóng
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">ID Vé</th>
              <th className="px-6 py-3 text-left font-semibold">ID Đặt vé</th>
              <th className="px-6 py-3 text-left font-semibold">Chuyến bay</th>
              <th className="px-6 py-3 text-left font-semibold">Ghế</th>
              <th className="px-6 py-3 text-left font-semibold">Hành khách</th>
              <th className="px-6 py-3 text-left font-semibold">Giá</th>
              <th className="px-6 py-3 text-left font-semibold">Trạng thái</th>
              <th className="px-6 py-3 text-left font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.bookingId}</td>
                <td className="px-6 py-4">{ticket.flightCode}</td>
                <td className="px-6 py-4">{ticket.seatNumber}</td>
                <td className="px-6 py-4">{ticket.passengerName}</td>
                <td className="px-6 py-4">
                  {Number(ticket.price).toLocaleString("vi-VN")} VND
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ticket.status === "issued"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ticket.status === "issued" ? "Đã phát hành" : "Đã hủy"}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Không có dữ liệu vé
          </div>
        )}
      </div>
    </div>
  );
}
