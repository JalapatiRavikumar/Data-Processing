import { useState } from "react";

const defaultForm = {
  amount: "",
  type: "expense",
  category: "",
  date: "",
  notes: ""
};

function RecordForm({ initialData, onSubmit, onCancel, disabled }) {
  const [form, setForm] = useState(() =>
    initialData
      ? {
          amount: initialData.amount,
          type: initialData.type,
          category: initialData.category,
          date: initialData.date?.slice(0, 10),
          notes: initialData.notes || ""
        }
      : defaultForm
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">{initialData ? "Edit Record" : "Add Record"}</h3>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="amount"
          type="number"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="rounded border border-slate-300 px-3 py-2"
          required
          disabled={disabled}
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="rounded border border-slate-300 px-3 py-2"
          disabled={disabled}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="rounded border border-slate-300 px-3 py-2"
          required
          disabled={disabled}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="rounded border border-slate-300 px-3 py-2"
          required
          disabled={disabled}
        />
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="mt-3 w-full rounded border border-slate-300 px-3 py-2"
        rows={3}
        disabled={disabled}
      />
      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          disabled={disabled}
        >
          {initialData ? "Update" : "Create"}
        </button>
        {initialData ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-slate-300 px-4 py-2 text-sm"
            disabled={disabled}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default RecordForm;
