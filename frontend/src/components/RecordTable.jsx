import { formatDate } from "../utils/formatters";

function RecordTable({ records, canEdit, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold">Records</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">Category</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Notes</th>
              {canEdit ? <th className="py-2">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="border-b border-slate-100">
                <td className="py-2">{formatDate(record.date)}</td>
                <td className="py-2 capitalize">{record.type}</td>
                <td className="py-2">{record.category}</td>
                <td className="py-2">${Number(record.amount).toFixed(2)}</td>
                <td className="py-2">{record.notes || "-"}</td>
                {canEdit ? (
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => onEdit(record)}
                      className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(record._id)}
                      className="rounded bg-red-700 px-2 py-1 text-xs text-white"
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecordTable;
