function StatCard({ title, value, accent = "text-slate-900" }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">{title}</p>
      <p className={`mt-2 text-2xl font-semibold ${accent}`}>${Number(value || 0).toFixed(2)}</p>
    </div>
  );
}

export default StatCard;
