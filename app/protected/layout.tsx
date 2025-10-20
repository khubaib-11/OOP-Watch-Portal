"use client";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex flex-row">
          <SideBar />
          <div className="flex flex-col gap-20 max-w-5xl p-5 flex-1">
            {children}
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
