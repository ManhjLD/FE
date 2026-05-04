import { useEffect, useState } from "react";
import {
  getAdminAirports,
  createAdminAirport,
  updateAdminAirport,
  deleteAdminAirport,
} from "@/services/adminService";

export default function Airports() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    role: "admin", // Updated to include admin role
    code: "",
    name: "",
    city: "",
    country: "",
    status: "active",
  });

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      const response = await getAdminAirports();
      setAirports(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching airports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAdminAirport(editingId, formData);
      } else {
        await createAdminAirport(formData);
      }
      setFormData({
        code: "",
        name: "",
        city: "",
        country: "",
        status: "active",
      });
      setEditingId(null);
      setShowForm(false);
      fetchAirports();
    } catch (err) {
      setError(err.message);
      console.error("Error saving airport:", err);
    }
  };

  const handleEdit = (airport) => {
    setFormData({
      code: airport.code,
      name: airport.name,
      city: airport.city || "",
      country: airport.country || "",
      status: airport.status || "active",
    });
    setEditingId(airport.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sân bay này?")) {
      try {
        await deleteAdminAirport(id);
        fetchAirports();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting airport:", err);
      }
    }
  };

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-lg">
      <div className="flex justify-between mb-xl items-center">
        <h1 className="text-h1 font-bold text-on-background">
          Quản lý sân bay
        </h1>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              code: "",
              name: "",
              city: "",
              country: "",
              status: "active",
            });
          }}
          className="bg-secondary-container text-on-secondary px-lg py-md rounded-md font-semibold text-button hover:opacity-90 transition-all active:scale-95 shadow-orange"
        >
          + {showForm ? "Hủy" : "Thêm sân bay"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-soft-navy mb-lg"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Mã sân bay"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value.toUpperCase() })
              }
              className="border p-2 rounded"
              required
              maxLength="3"
            />
            <input
              type="text"
              placeholder="Tên sân bay"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Thành phố"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Quốc gia"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="border p-2 rounded"
            />
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 rounded md:col-span-2"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
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

      <div className="bg-white rounded-lg shadow-soft-navy overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container">
            <tr>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">
                Code
              </th>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">
                Sân bay
              </th>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">
                Thành phố
              </th>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">
                Quốc gia
              </th>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">
                Trạng thái
              </th>
              <th className="text-left px-md py-md text-label-caps text-on-surface-variant">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {airports.length > 0 ? (
              airports.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-outline-variant hover:bg-surface transition-colors"
                >
                  <td className="px-md py-md text-body-md text-on-surface font-semibold">
                    {item.code}
                  </td>
                  <td className="px-md py-md text-body-md text-on-surface">
                    {item.name}
                  </td>
                  <td className="px-md py-md text-body-md text-on-surface">
                    {item.city}
                  </td>
                  <td className="px-md py-md text-body-md text-on-surface">
                    {item.country}
                  </td>
                  <td className="px-md py-md">
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </td>
                  <td className="px-md py-md space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Không có sân bay nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
