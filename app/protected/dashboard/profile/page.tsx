"use client";
import FieldSection from "@/components/FieldSection";
import ProfilePicture from "@/components/ProfilePicture";
import { useProfileScreenData } from "@/hooks/useProfileScreenData";
import { Spinner } from "@/components/ui/spinner";

const PAGE_BASE_URL = "/protected/dashboard/profile";
function ProfileScreen() {
  const { data, isLoading, error } = useProfileScreenData();
  let profileUIStructure;
  if (data?.profile) {
    profileUIStructure = [
      {
        section: "Contact Details",
        inputFields: [
          {
            label: "Full Name",
            // After fetching data, fill below and other values
            value: data?.profile[0].full_name ?? "Not provided",
            // Locked means this input should show lock icon and is not click able
            locked: false,
            editUrl: `${PAGE_BASE_URL}/edit/editFullName`,
          },
          {
            label: "Email",
            // After fetching data, fill below and other values
            value: data?.profile[0].email ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/edit/editEmail`,
          },
          {
            label: "Phone Number",
            // After fetching data, fill below and other values
            value: data?.profile[0].phone ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/edit/editPhone`,
          },

          {
            label: "Location",
            // After fetching data, fill below and other values
            value: data?.profile[0].location ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/edit/editLocation`,
          },
        ],
      },
      {
        section: "Personal Demographics",
        inputFields: [
          {
            label: "Age",
            // After fetching data, fill below and other values
            value: data?.profile[0].age ?? "Not provided",
            // Locked means this input should show lock icon and is not click able
            locked: false,
            editUrl: `${PAGE_BASE_URL}/edit/editAge`,
          },
          {
            label: "Gender",
            // After fetching data, fill below and other values
            value: data?.profile[0].gender ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/edit/editGender`,
          },
        ],
      },
    ];
  }

  if (isLoading) {
    return (
      <div className=" flex flex-col gap-4  h-screen justify-center items-center ">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <p>{data?.error?.message}</p>;
  }

  console.log(data);

  return (
    <div className=" w-full h-screen">
      <ProfilePicture profileName="" />
      <div className="mt-8">
        {profileUIStructure?.map((p) => (
          <FieldSection
            key={p.section}
            section={p.section}
            inputFields={p.inputFields}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileScreen;
