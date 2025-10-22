"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

function page() {
  async function onClickLogout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast("Failed to logout");
    } else {
      toast("Your are logged out.");
      redirect("/");
    }
  }
  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Logout</h1>
      <p>
        Log out from your account. You will need your email and password to
        login again.
      </p>

      <div className="flex justify-between items-center mt-8">
        <Button
          variant="destructive"
          onClick={onClickLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default page;
