import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children, // will be a page or nested layout
}) {
  return <section>{children}</section>;
}
