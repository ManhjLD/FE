import { useEffect, useState } from "react";
import {
  getBranchPayments,
  createBranchPayment,
  updateBranchPayment,
} from "@/services/branchService";

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
    paymentDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchPayments();
  }, [filterStatus]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = filterStatus !== "all" ? { status: filterStatus } : {};
      const response = await getBranchPayments(params);
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
        await updateBranchPayment(editingId, formData);
      } else {
        await createBranchPayment(formData);
      }
      setFormData({
        bookingId: "",
        amount: "",
        method: "credit_card",
        transactionId: "",
        status: "completed",
        paymentDate: new Date().toISOString().split("T")[0],
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

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  const totalPayments = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const completedPayments = payments.filter(
    (p) => p.status === "completed"
  ).length;
  const pendingPayments = payments.filter((p) => p.status === "pending").length;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">Quản lý thanh toán</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Tổng thanh toán
          </h3>
          <p className="text-3xl font-bold text-primary">
            {Number(totalPayments).toLocaleString("vi-VN")} VND
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Đã hoàn thành
          </h3>
          <p className="text-3xl font-bold text-green-600">{completedPayments}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Đang chờ
          </h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingPayments}</p>
        </div>
      </div>

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
            Đã hoàn thành
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded ${
              filterStatus === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Đang chờ
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
              paymentDate: new Date().toISOString().split("T")[0],
            });
          }}
          className="bg-blue-900 text-white px-5 py-3 rounded hover:bg-blue-800"
        >
          + {showForm ? "Hủy" : "Tạo thanh toán"}
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
              <option value="bank_transfer">Chuyển khoản ngân hàng</option>
              <option value="cash">Tiền mặt</option>
              <option value="digital_wallet">Ví điện tử</option>
            </select>
            <input
              type="text"
              placeholder="Mã giao dịch"
              value={formData.transactionId}
              onChange={(e) =>
                setFormData({ ...formData, transactionId: e.target.value })
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
              <option value="completed">Đã hoàn thành</option>
              <option value="pending">Đang chờ</option>
              <option value="failed">Thất bại</option>
            </select>
            <input
              type="date"
              value={formData.paymentDate}
              onChange={(e) =>
                setFormData({ ...formData, paymentDate: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingId ? "Cập nhật" : "Tạo mới"}
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
              <th className="px-6 py-3 text-left font-semibold">ID</th>
              <th className="px-6 py-3 text-left font-semibold">ID Đặt vé</th>
              <th className="px-6 py-3 text-left font-semibold">Số tiền</th>
              <th className="px-6 py-3 text-left font-semibold">Phương thức</th>
              <th className="px-6 py-3 text-left font-semibold">Mã GD</th>
              <th className="px-6 py-3 text-left font-semibold">Trạng thái</th>
              <th className="px-6 py-3 text-left font-semibold">Ngày thanh toán</th>
              <th className="px-6 py-3 text-left font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{payment.id}</td>
                <td className="px-6 py-4">{payment.bookingId}</td>
                <td className="px-6 py-4 font-semibold">
                  {Number(payment.amount).toLocaleString("vi-VN")} VND
                </td>
                <td className="px-6 py-4 text-sm">{payment.method}</td>
                <td className="px-6 py-4 text-sm">{payment.transactionId}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      payment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status === "completed"
                      ? "Đã hoàn thành"
                      : payment.status === "pending"
                      ? "Đang chờ"
                      : "Thất bại"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(payment.paymentDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(payment)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Không có dữ liệu thanh toán
          </div>
        )}
      </div>
    </div>
  );
}
