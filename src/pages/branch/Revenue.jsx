import { useEffect, useState } from "react";
import {
  getBranchRevenue,
  getBranchDailyRevenue,
  getBranchMonthlyRevenue,
  getBranchRevenueSummary,
} from "@/services/branchService";

export default function Revenue() {
  const [revenue, setRevenue] = useState(null);
  const [dailyRevenue, setDailyRevenue] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const [dailyRes, monthlyRes, summaryRes] = await Promise.all([
          getBranchDailyRevenue(today),
          getBranchMonthlyRevenue(month, year),
          getBranchRevenueSummary(),
        ]);

        setDailyRevenue(dailyRes?.data);
        setMonthlyRevenue(monthlyRes?.data);
        setSummary(summaryRes?.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching revenue:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const formatCurrency = (value) => {
    if (!value) return "0đ";
    return `${(value / 1000000).toFixed(1)} triệu`;
  };

  if (loading)
    return <div className="p-6 text-center">Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Doanh thu chi nhánh</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Lỗi: {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Hôm nay</p>
          <h2 className="text-2xl font-bold">
            {formatCurrency(dailyRevenue?.total)}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {dailyRevenue?.bookingCount || 0} vé
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Tháng này</p>
          <h2 className="text-2xl font-bold">
            {formatCurrency(monthlyRevenue?.total)}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {monthlyRevenue?.bookingCount || 0} vé
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Năm nay</p>
          <h2 className="text-2xl font-bold">
            {formatCurrency(summary?.yearlyTotal)}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {summary?.yearlyBookings || 0} vé
          </p>
        </div>
      </div>

      {summary && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">Tổng quan</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Tổng doanh thu:</span>
                <span className="font-bold">
                  {formatCurrency(summary?.totalRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Trung bình/ngày:</span>
                <span className="font-bold">
                  {formatCurrency(summary?.averageDailyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tổng vé bán:</span>
                <span className="font-bold">{summary?.totalBookings}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">Thống kê khác</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Số tuyến bay:</span>
                <span className="font-bold">{summary?.routeCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Khách hàng mới:</span>
                <span className="font-bold">
                  {summary?.newCustomersCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tỉ lệ quay lại:</span>
                <span className="font-bold">
                  {(summary?.returnCustomerRate * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}