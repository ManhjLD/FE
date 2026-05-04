import { useEffect, useState } from "react";
import {
  getStaffTickets,
  createStaffTicket,
  updateStaffTicket,
  deleteStaffTicket,
} from "@/services/staffService";

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
      const response = await getStaffTickets(params);
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
        await updateStaffTicket(editingId, formData);
      } else {
        await createStaffTicket(formData);
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
        await deleteStaffTicket(id);
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
              placeholder="Giá"
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
              <option value="used">Đã sử dụng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            {editingId ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-4 text-left">ID Vé</th>
              <th className="p-4 text-left">ID Đặt vé</th>
              <th className="p-4 text-left">Chuyến bay</th>
              <th className="p-4 text-left">Ghế</th>
              <th className="p-4 text-left">Hành khách</th>
              <th className="p-4 text-left">Giá</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{ticket.id}</td>
                  <td className="p-4">{ticket.bookingId}</td>
                  <td className="p-4">{ticket.flightCode}</td>
                  <td className="p-4">{ticket.seatNumber}</td>
                  <td className="p-4">{ticket.passengerName}</td>
                  <td className="p-4">
                    {(ticket.price || 0).toLocaleString()}đ
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        ticket.status === "issued"
                          ? "bg-blue-100 text-blue-800"
                          : ticket.status === "used"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {ticket.status === "issued"
                        ? "Đã phát hành"
                        : ticket.status === "used"
                          ? "Đã sử dụng"
                          : "Đã hủy"}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Không có vé nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
