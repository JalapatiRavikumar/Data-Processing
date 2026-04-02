import { useEffect, useState } from "react";
import { createUserApi, deleteUserApi, getUsersApi, updateUserApi } from "../api/userApi";
import LoadingSpinner from "../components/LoadingSpinner";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
  status: "active"
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingUserId, setEditingUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getUsersApi();
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (editingUserId) {
        const payload = { ...form };
        if (!payload.password) {
          delete payload.password;
        }
        await updateUserApi(editingUserId, payload);
      } else {
        await createUserApi(form);
      }
      setForm(initialForm);
      setEditingUserId("");
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save user");
    }
  };

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status
    });
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteUserApi(id);
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete user");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-sm text-slate-600">Admin can create/update/delete and manage user status.</p>
      </div>
      {error ? <p className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</p> : null}

      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">{editingUserId ? "Edit User" : "Create User"}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="rounded border border-slate-300 px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="rounded border border-slate-300 px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder={editingUserId ? "New Password (optional)" : "Password"}
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="rounded border border-slate-300 px-3 py-2"
            required={!editingUserId}
          />
          <select
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="viewer">Viewer</option>
            <option value="analyst">Analyst</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="mt-3 flex gap-2">
          <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            {editingUserId ? "Update" : "Create"}
          </button>
          {editingUserId ? (
            <button
              type="button"
              onClick={() => {
                setEditingUserId("");
                setForm(initialForm);
              }}
              className="rounded border border-slate-300 px-4 py-2 text-sm"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-slate-100">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2 capitalize">{user.role}</td>
                    <td className="py-2 capitalize">{user.status}</td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => startEdit(user)}
                        className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user._id)}
                        className="rounded bg-red-700 px-2 py-1 text-xs text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
