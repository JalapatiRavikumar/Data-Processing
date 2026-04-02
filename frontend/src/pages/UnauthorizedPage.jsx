import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Unauthorized</h1>
      <p className="mt-2 text-slate-600">You do not have permission to access this page.</p>
      <Link to="/dashboard" className="mt-4 rounded bg-slate-900 px-4 py-2 text-white">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default UnauthorizedPage;
