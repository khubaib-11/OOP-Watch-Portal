import { createClient } from "@/lib/supabase/client";

export async function getTeamsAndTasksScreenData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Could not find the user. Make sure you are logged in.");
  }
  const { data: teamsAndTasks, error } = await supabase
    .from("profiles")
    .select(
      `motivation,
        user_teams (
        *
        )
        `
    )
    .eq("id", user.id);
  return {
    teamsAndTasks,
    error,
  };
}

export async function updateMotivation(motivation: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ motivation: motivation })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}
