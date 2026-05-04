import { useEffect, useState } from "react";
import {
  getAdminFlights,
  createAdminFlight,
  updateAdminFlight,
  deleteAdminFlight,
} from "@/services/adminService";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    departure: "",
    arrival: "",
    departureTime: "",
    duration: "",
    price: "",
    totalSeats: "",
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await getAdminFlights();
      setFlights(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAdminFlight(editingId, formData);
      } else {
        await createAdminFlight(formData);
      }
      setFormData({
        code: "",
        departure: "",
        arrival: "",
        departureTime: "",
        duration: "",
        price: "",
        totalSeats: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchFlights();
    } catch (err) {
      setError(err.message);
      console.error("Error saving flight:", err);
    }
  };

  const handleEdit = (flight) => {
    setFormData(flight);
    setEditingId(flight.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chuyến bay này?")) {
      try {
        await deleteAdminFlight(id);
        fetchFlights();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting flight:", err);
      }
    }
  };

  if (loading)
    return <div className="p-6 text-center">Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý chuyến bay</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
        Lỗi: {error}
      </div>}

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            code: "",
            departure: "",
            arrival: "",
            departureTime: "",
            duration: "",
            price: "",
            totalSeats: "",
          });
        }}
        className="bg-blue-900 text-white px-5 py-3 rounded mb-6 hover:bg-blue-800"
      >
        + {showForm ? "Hủy" : "Thêm chuyến bay"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Mã chuyến bay"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nơi khởi hành"
              value={formData.departure}
              onChange={(e) =>
                setFormData({ ...formData, departure: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nơi đến"
              value={formData.arrival}
              onChange={(e) =>
                setFormData({ ...formData, arrival: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="time"
              placeholder="Giờ khởi hành"
              value={formData.departureTime}
              onChange={(e) =>
                setFormData({ ...formData, departureTime: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Thời lượng (phút)"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="border p-2 rounded"
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
            <input
              type="number"
              placeholder="Tổng ghế"
              value={formData.totalSeats}
              onChange={(e) =>
                setFormData({ ...formData, totalSeats: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            {editingId ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3">Mã</th>
              <th className="pb-3">Tuyến</th>
              <th className="pb-3">Giờ bay</th>
              <th className="pb-3">Giá</th>
              <th className="pb-3">Ghế</th>
              <th className="pb-3">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {flights.length > 0 ? (
              flights.map((flight) => (
                <tr key={flight.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{flight.code}</td>
                  <td className="py-3">
                    {flight.departure} → {flight.arrival}
                  </td>
                  <td className="py-3">{flight.departureTime}</td>
                  <td className="py-3">{flight.price?.toLocaleString()}đ</td>
                  <td className="py-3">{flight.totalSeats}</td>
                  <td className="py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(flight)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(flight.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Không có chuyến bay nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}