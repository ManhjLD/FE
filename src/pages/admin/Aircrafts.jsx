import { useEffect, useState } from "react";
import {
  getAdminAircrafts,
  createAdminAircraft,
  updateAdminAircraft,
  deleteAdminAircraft,
} from "@/services/adminService";

export default function Aircrafts() {
  const [aircrafts, setAircrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    role: "admin", // Updated to include admin role
    code: "",
    model: "",
    capacity: "",
    manufacturer: "",
    status: "active",
    purchaseDate: "",
  });

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const fetchAircrafts = async () => {
    try {
      setLoading(true);
      const response = await getAdminAircrafts();
      setAircrafts(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching aircrafts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAdminAircraft(editingId, formData);
      } else {
        await createAdminAircraft(formData);
      }
      setFormData({
        code: "",
        model: "",
        capacity: "",
        manufacturer: "",
        status: "active",
        purchaseDate: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchAircrafts();
    } catch (err) {
      setError(err.message);
      console.error("Error saving aircraft:", err);
    }
  };

  const handleEdit = (aircraft) => {
    setFormData({
      code: aircraft.code,
      model: aircraft.model,
      capacity: aircraft.capacity,
      manufacturer: aircraft.manufacturer,
      status: aircraft.status,
      purchaseDate: aircraft.purchaseDate,
    });
    setEditingId(aircraft.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa máy bay này?")) {
      try {
        await deleteAdminAircraft(id);
        fetchAircrafts();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting aircraft:", err);
      }
    }
  };

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">Quản lý máy bay</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            code: "",
            model: "",
            capacity: "",
            manufacturer: "",
            status: "active",
            purchaseDate: "",
          });
        }}
        className="bg-blue-900 text-white px-5 py-3 rounded mb-6 hover:bg-blue-800"
      >
        + {showForm ? "Hủy" : "Thêm máy bay"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Mã máy bay"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Số ghế"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nhà sản xuất"
              value={formData.manufacturer}
              onChange={(e) =>
                setFormData({ ...formData, manufacturer: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="date"
              placeholder="Ngày mua"
              value={formData.purchaseDate}
              onChange={(e) =>
                setFormData({ ...formData, purchaseDate: e.target.value })
              }
              className="border p-2 rounded"
            />
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="maintenance">Bảo trì</option>
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
              <th className="p-4 text-left">Mã</th>
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-left">Nhà sản xuất</th>
              <th className="p-4 text-left">Ghế</th>
              <th className="p-4 text-left">Ngày mua</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {aircrafts.length > 0 ? (
              aircrafts.map((aircraft) => (
                <tr key={aircraft.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{aircraft.code}</td>
                  <td className="p-4">{aircraft.model}</td>
                  <td className="p-4">{aircraft.manufacturer}</td>
                  <td className="p-4">{aircraft.capacity}</td>
                  <td className="p-4">
                    {new Date(aircraft.purchaseDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        aircraft.status === "active"
                          ? "bg-green-100 text-green-800"
                          : aircraft.status === "maintenance"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {aircraft.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(aircraft)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(aircraft.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Không có máy bay nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
