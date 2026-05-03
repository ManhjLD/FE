import { useEffect, useState } from "react";
import {
  getAdminBranches,
  createAdminBranch,
  updateAdminBranch,
  deleteAdminBranch,
} from "@/services/adminService";

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    role: "admin", // Updated to include admin role
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response = await getAdminBranches();
      setBranches(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching branches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAdminBranch(editingId, formData);
      } else {
        await createAdminBranch(formData);
      }
      setFormData({
        name: "",
        code: "",
        address: "",
        phone: "",
        email: "",
        city: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchBranches();
    } catch (err) {
      setError(err.message);
      console.error("Error saving branch:", err);
    }
  };

  const handleEdit = (branch) => {
    setFormData(branch);
    setEditingId(branch.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chi nhánh này?")) {
      try {
        await deleteAdminBranch(id);
        fetchBranches();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting branch:", err);
      }
    }
  };

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-lg">
      <div className="flex justify-between mb-xl items-center">
        <h1 className="text-h1 font-bold text-on-background">
          Quản lý chi nhánh
        </h1>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              name: "",
              code: "",
              address: "",
              phone: "",
              email: "",
              city: "",
            });
          }}
          className="bg-secondary-container text-on-secondary px-lg py-md rounded-md font-semibold text-button hover:opacity-90 transition-all active:scale-95 shadow-orange"
        >
          + {showForm ? "Hủy" : "Thêm chi nhánh"}
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
              placeholder="Tên chi nhánh"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Mã chi nhánh"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="border p-2 rounded"
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
              type="tel"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 rounded"
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

      <div className="grid md:grid-cols-2 gap-md">
        {branches.length > 0 ? (
          branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-lg shadow-soft-navy p-lg hover:shadow-lg transition-shadow"
            >
              <p className="text-h3 font-bold text-primary-container">
                {branch.name}
              </p>
              <p className="text-body-md text-on-surface-variant mt-base">
                Mã: {branch.code}
              </p>
              <p className="text-body-md text-on-surface-variant">
                {branch.address}, {branch.city}
              </p>
              <p className="text-body-md text-on-surface-variant">
                {branch.phone}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(branch)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(branch.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-2 py-8">
            Không có chi nhánh nào
          </div>
        )}
      </div>
    </div>
  );
}
