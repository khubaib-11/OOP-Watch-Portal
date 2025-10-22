import { AuthButton } from "@/components/auth-button";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <main className="flex-1 flex flex-col items-center gap-6 px-4">
            <h1 className="text-[32px] md:[48px] lg:[60px] font-medium text-center">
              Welcome to Oppressed Watch Portal
            </h1>
            <AuthButton />
          </main>
        </div>
      </div>
    </main>
  );
}
