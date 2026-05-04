import { useEffect, useState } from "react";
import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  updateAdminUserRole,
  updateAdminUserStatus,
} from "@/services/adminService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "user", // Updated to include user role
    status: "active",
  });

  useEffect(() => {
    fetchUsers();
  }, [filterRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = filterRole !== "all" ? { role: filterRole } : {};
      const response = await getAdminUsers(params);
      setUsers(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAdminUser(editingId, formData);
      } else {
        await createAdminUser(formData);
      }
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        status: "active",
      });
      setEditingId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error("Error saving user:", err);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      fullName: user.fullName || user.name,
      email: user.email,
      phone: user.phone,
      password: "",
      role: user.role || "user",
      status: user.status || "active",
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await deleteAdminUser(id);
        fetchUsers();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateAdminUserRole(id, newRole);
      fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error("Error updating role:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdminUserStatus(id, newStatus);
      fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error("Error updating status:", err);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">Quản lý Người dùng</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterRole("all")}
            className={`px-4 py-2 rounded ${
              filterRole === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterRole("user")}
            className={`px-4 py-2 rounded ${
              filterRole === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setFilterRole("staff")}
            className={`px-4 py-2 rounded ${
              filterRole === "staff"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Staff
          </button>
          <button
            onClick={() => setFilterRole("admin")}
            className={`px-4 py-2 rounded ${
              filterRole === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin
          </button>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              password: "",
              role: "user",
              status: "active",
            });
          }}
          className="bg-blue-900 text-white px-5 py-3 rounded hover:bg-blue-800"
        >
          + {showForm ? "Hủy" : "Thêm người dùng"}
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
              placeholder="Tên đầy đủ"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 rounded"
              required
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
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border p-2 rounded"
              required={!editingId}
            />
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="border p-2 rounded"
              required
            >
              <option value="user">Khách hàng</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 rounded"
              required
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

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-4 text-left">Tên</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">SĐT</th>
              <th className="p-4 text-left">Vai trò</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.fullName || user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">
                    <select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="border p-1 rounded text-sm"
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      value={user.status || "active"}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.value)
                      }
                      className={`border p-1 rounded text-sm ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                    </select>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Không có người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
