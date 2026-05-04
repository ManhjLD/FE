import { useEffect, useState } from "react";
import {
  getBranchDashboard,
  getBranchStatistics,
} from "@/services/branchService";

function BranchDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboardRes, statsRes] = await Promise.all([
          getBranchDashboard(),
          getBranchStatistics(),
        ]);
        setDashboard(dashboardRes?.data);
        setStatistics(statsRes?.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching branch dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="p-10 text-red-500">Lỗi: {error}</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Dashboard Chi Nhánh
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card
          title="Khách hàng"
          value={dashboard?.totalCustomers || statistics?.customersCount || "N/A"}
        />
        <Card
          title="Vé hôm nay"
          value={dashboard?.todayTickets || statistics?.todayTickets || "N/A"}
        />
        <Card
          title="Doanh thu"
          value={dashboard?.revenue || statistics?.revenue || "N/A"}
        />
        <Card
          title="Chuyến bay"
          value={dashboard?.totalFlights || statistics?.flightsCount || "N/A"}
        />
      </div>

      {dashboard && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card
            title="Tổng đặt vé"
            value={dashboard?.totalBookings || "N/A"}
          />
          <Card
            title="Staff"
            value={dashboard?.staffCount || "N/A"}
          />
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default BranchDashboard;