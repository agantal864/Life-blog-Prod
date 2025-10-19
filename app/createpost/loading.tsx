export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      <p className="text-gray-700 text-lg font-medium">Loading content…</p>
    </div>
  );
}
