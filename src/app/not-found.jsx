import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-bold mb-4">404 - Not Found</h2>
      <p className="mb-4">Could not find the requested resource.</p>
      <Link href="/home">
        <span className="text-blue-500 hover:underline">Return Home</span>
      </Link>
    </div>
  );
}
