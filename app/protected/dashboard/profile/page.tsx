"use client";
import FieldSection from "@/components/FieldSection";
import ProfilePicture from "@/components/ProfilePicture";
import { useProfileScreenData } from "@/hooks/useProfileScreenData";

const PAGE_BASE_URL = "/protected/dashboard/profile/edit";
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
            editUrl: `${PAGE_BASE_URL}/editFullName`,
          },
          {
            label: "Email",
            // After fetching data, fill below and other values
            value: data?.profile[0].email ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editEmail`,
          },
          {
            label: "Phone Number",
            // After fetching data, fill below and other values
            value: data?.profile[0].phone ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editPhone`,
          },

          {
            label: "Location",
            // After fetching data, fill below and other values
            value: data?.profile[0].location ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editLocation`,
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
            editUrl: `${PAGE_BASE_URL}/editAge`,
          },
          {
            label: "Gender",
            // After fetching data, fill below and other values
            value: data?.profile[0].gender ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editGender`,
          },
        ],
      },
    ];
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{data?.error?.message}</p>;
  }

  console.log(data);

  return (
    <div className=" w-full h-screen">
      {/* //! after fetching data pass the name to profile */}
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
