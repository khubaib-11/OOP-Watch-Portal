import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      <Link href="/protected/dashboard">
        <Button>Go to dashboard</Button>
      </Link>

      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button
        asChild
        size="lg"
        variant={"outline"}
      >
        <Link href="/auth/login">Log in</Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant={"default"}
      >
        <Link href="/auth/sign-up">Create Account</Link>
      </Button>
    </div>
  );
}
