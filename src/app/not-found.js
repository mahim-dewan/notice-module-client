// app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="mb-6 text-dark-navy">Page Not Found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Return Home
      </Link>
    </div>
  );
}
