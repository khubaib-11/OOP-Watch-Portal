import { redirect } from "next/navigation";
import React from "react";

//! This page does nothing. If user manually puts this URL : dashboard/ then we need to handel it later

//? For now it just sends user to profile page directly
function page() {
  redirect("/protected/dashboard/profile");

  return <div>Dashboard page</div>;
}

export default page;
