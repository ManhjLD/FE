import { useEffect, useState } from "react";
import {
  getStaffPayments,
  createStaffPayment,
  updateStaffPayment,
  deleteStaffPayment,
} from "@/services/staffService";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState({
    bookingId: "",
    amount: "",
    method: "credit_card",
    transactionId: "",
    status: "completed",
    paymentDate: "",
  });

  useEffect(() => {
    fetchPayments();
  }, [filterStatus]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = filterStatus !== "all" ? { status: filterStatus } : {};
      const response = await getStaffPayments(params);
      setPayments(response?.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStaffPayment(editingId, formData);
      } else {
        await createStaffPayment(formData);
      }
      setFormData({
        bookingId: "",
        amount: "",
        method: "credit_card",
        transactionId: "",
        status: "completed",
        paymentDate: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchPayments();
    } catch (err) {
      setError(err.message);
      console.error("Error saving payment:", err);
    }
  };

  const handleEdit = (payment) => {
    setFormData({
      bookingId: payment.bookingId,
      amount: payment.amount,
      method: payment.method,
      transactionId: payment.transactionId,
      status: payment.status,
      paymentDate: payment.paymentDate,
    });
    setEditingId(payment.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thanh toán này?")) {
      try {
        await deleteStaffPayment(id);
        fetchPayments();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting payment:", err);
      }
    }
  };

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  const totalPayments = payments.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Quản lý thanh toán</h1>
        <div className="text-right">
          <div className="text-sm text-gray-600">Tổng thanh toán</div>
          <div className="text-3xl font-bold text-green-600">
            {totalPayments.toLocaleString()}đ
          </div>
        </div>
      </div>

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
            onClick={() => setFilterStatus("completed")}
            className={`px-4 py-2 rounded ${
              filterStatus === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Hoàn tất
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded ${
              filterStatus === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Chờ xử lý
          </button>
          <button
            onClick={() => setFilterStatus("failed")}
            className={`px-4 py-2 rounded ${
              filterStatus === "failed"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Thất bại
          </button>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              bookingId: "",
              amount: "",
              method: "credit_card",
              transactionId: "",
              status: "completed",
              paymentDate: "",
            });
          }}
          className="bg-blue-900 text-white px-5 py-3 rounded hover:bg-blue-800"
        >
          + {showForm ? "Hủy" : "Thêm thanh toán"}
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
              type="number"
              placeholder="Số tiền"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <select
              value={formData.method}
              onChange={(e) =>
                setFormData({ ...formData, method: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="credit_card">Thẻ tín dụng</option>
              <option value="debit_card">Thẻ ghi nợ</option>
              <option value="bank_transfer">Chuyển khoản</option>
              <option value="cash">Tiền mặt</option>
            </select>
            <input
              type="text"
              placeholder="ID giao dịch"
              value={formData.transactionId}
              onChange={(e) =>
                setFormData({ ...formData, transactionId: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="date"
              placeholder="Ngày thanh toán"
              value={formData.paymentDate}
              onChange={(e) =>
                setFormData({ ...formData, paymentDate: e.target.value })
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
              <option value="completed">Hoàn tất</option>
              <option value="pending">Chờ xử lý</option>
              <option value="failed">Thất bại</option>
              <option value="refunded">Hoàn lại</option>
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
              <th className="p-4 text-left">ID Thanh toán</th>
              <th className="p-4 text-left">ID Đặt vé</th>
              <th className="p-4 text-left">Số tiền</th>
              <th className="p-4 text-left">Phương thức</th>
              <th className="p-4 text-left">ID Giao dịch</th>
              <th className="p-4 text-left">Ngày</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{payment.id}</td>
                  <td className="p-4">{payment.bookingId}</td>
                  <td className="p-4 font-semibold">
                    {(payment.amount || 0).toLocaleString()}đ
                  </td>
                  <td className="p-4">
                    {payment.method === "credit_card"
                      ? "Thẻ tín dụng"
                      : payment.method === "debit_card"
                        ? "Thẻ ghi nợ"
                        : payment.method === "bank_transfer"
                          ? "Chuyển khoản"
                          : "Tiền mặt"}
                  </td>
                  <td className="p-4 text-sm">{payment.transactionId}</td>
                  <td className="p-4">
                    {new Date(payment.paymentDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : payment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {payment.status === "completed"
                        ? "Hoàn tất"
                        : payment.status === "pending"
                          ? "Chờ xử lý"
                          : payment.status === "failed"
                            ? "Thất bại"
                            : "Hoàn lại"}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(payment)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(payment.id)}
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
                  Không có thanh toán nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
