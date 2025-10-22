import { createClient } from "@/lib/supabase/client";

export async function getSettingsScreenData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Could not find the user. Make sure you are logged in.");
  }
  const { data: settings, error } = await supabase
    .from("user_settings")
    .select(
      `allow_whatsapp_contact
        `
    )
    .eq("user_id", user.id);
  return {
    settings,
    error,
  };
}
