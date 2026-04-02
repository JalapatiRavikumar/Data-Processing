function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
    </div>
  );
}

export default LoadingSpinner;
