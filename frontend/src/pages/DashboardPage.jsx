import { useEffect, useState } from "react";
import { getDashboardSummaryApi } from "../api/dashboardApi";
import StatCard from "../components/StatCard";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    categoryWise: [],
    monthlyTrends: []
  });

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getDashboardSummaryApi();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Welcome {user?.name}. Role-based access: viewer(read-only), analyst(insights), admin(full control)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Income" value={data.totalIncome} accent="text-emerald-700" />
        <StatCard title="Total Expenses" value={data.totalExpenses} accent="text-red-700" />
        <StatCard title="Net Balance" value={data.netBalance} accent="text-indigo-700" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CategoryPieChart data={data.categoryWise} />
        <MonthlyTrendChart data={data.monthlyTrends} />
      </div>
    </div>
  );
}

export default DashboardPage;
