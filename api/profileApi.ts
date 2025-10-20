import { createClient } from "@/lib/supabase/client";

// ? This fnction fetches a user's profile data based on user auth.id
export async function getProfileScreenData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Could not find the user. Make sure you are logged in.");
  }
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      `*,
        user_links (
        platform_name, url
        )
        `
    )
    .eq("id", user.id);
  return {
    profile,
    error,
  };
}

//? Rename this function to updateFullName
export async function updateUserName(name: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: name })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}

// ? This function only updates email in public -> profile table not in auth -> users table. Make sure in future to update it in both places. Also when updating email, supabase wants the confirmation by sending a new email to newly inputted email.
export async function updateEmail(email: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    .update({ email: email })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}

export async function updatePhone(phone: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    // ? Convert the received phone from input field to number because database type for phone is number
    .update({ phone: phone })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}
export async function updateLocation(location: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    .update({ location: location })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}
export async function updateAge(age: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    // ? Convert the received phone from input field to number because database type for age is number
    .update({ age: Number(age) })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}
export async function updateGender(gender: "Male" | "Female") {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    // ? Convert the received phone from input field to number because database type for age is number
    .update({ gender: gender })
    .eq("id", String(user?.id))
    .select();

  return {
    data,
    error,
  };
}
