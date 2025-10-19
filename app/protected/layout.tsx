import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="flex flex-row ">
        <SideBar />
        <div className="flex flex-col gap-20 max-w-5xl p-5">{children}</div>
      </div>
    </main>
  );
}
