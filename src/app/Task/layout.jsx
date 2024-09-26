import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <Navbar />
      <nav></nav>
      {children}
    </section>
  );
}
