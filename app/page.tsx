import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <main className="flex-1 flex flex-col items-center gap-6 px-4">
            <h1 className="text-[60px] font-medium text-center">
              Welcome to Oppressed Watch Portal
            </h1>
            <Link href="/protected/dashboard">
              <Button>Go to dashboard</Button>
            </Link>
          </main>
        </div>
      </div>
    </main>
  );
}
