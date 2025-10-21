import { createClient } from "@/lib/supabase/client";

export async function getProfessionalDetailsScreenData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Could not find the user. Make sure you are logged in.");
  }
  const { data: professionalDetails, error } = await supabase
    .from("profiles")
    .select(
      `profession ,education,
        user_skills (
        skill_id, level
        ),
        user_languages (
        language_id, proficiency)
        `
    )
    .eq("id", user.id);
  return {
    professionalDetails,
    error,
  };
}
// education, profession, skills, languages

export async function updateEducation(education: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ education: education })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}
export async function updateProfession(profession: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ profession: profession })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}
