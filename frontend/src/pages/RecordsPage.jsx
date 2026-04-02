import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createRecordApi,
  deleteRecordApi,
  getRecordsApi,
  updateRecordApi
} from "../api/recordApi";
import RecordForm from "../components/RecordForm";
import RecordTable from "../components/RecordTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

function RecordsPage() {
  const { user } = useAuth();
  const canEdit = useMemo(() => user?.role === "admin" || user?.role === "analyst", [user]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [filters, setFilters] = useState({ type: "", category: "" });

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getRecordsApi({
        ...(filters.type ? { type: filters.type } : {}),
        ...(filters.category ? { category: filters.category } : {})
      });
      setRecords(response.data.records);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load records");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleSubmitRecord = async (payload) => {
    setSaving(true);
    setError("");
    try {
      if (editingRecord) {
        await updateRecordApi(editingRecord._id, payload);
      } else {
        await createRecordApi(payload);
      }
      setEditingRecord(null);
      await fetchRecords();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save record");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRecord = async (id) => {
    setError("");
    try {
      await deleteRecordApi(id);
      await fetchRecords();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete record");
    }
  };

  const handleFilter = async (event) => {
    event.preventDefault();
    await fetchRecords();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Financial Records</h1>
        <p className="text-sm text-slate-600">Create, filter, update and delete financial records.</p>
      </div>
      {error ? <p className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</p> : null}

      <form onSubmit={handleFilter} className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-4">
        <select
          value={filters.type}
          onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
          className="rounded border border-slate-300 px-3 py-2"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          placeholder="Category filter"
          className="rounded border border-slate-300 px-3 py-2"
        />
        <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">
          Apply
        </button>
      </form>

      {canEdit ? (
        <RecordForm
          key={editingRecord?._id || "create-record"}
          initialData={editingRecord}
          onSubmit={handleSubmitRecord}
          onCancel={() => setEditingRecord(null)}
          disabled={saving}
        />
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
          Viewer role has read-only access.
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <RecordTable
          records={records}
          canEdit={canEdit}
          onEdit={setEditingRecord}
          onDelete={handleDeleteRecord}
        />
      )}
    </div>
  );
}

export default RecordsPage;
