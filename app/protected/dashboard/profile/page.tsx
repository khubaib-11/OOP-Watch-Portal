import FieldSection from "@/components/FieldSection";
import ProfilePicture from "@/components/ProfilePicture";

const PAGE_BASE_URL = "/protected/dashboard/profile/edit";
function page() {
  const profileUIStructure = [
    {
      section: "Contact Details",
      inputFields: [
        {
          label: "Full Name",
          // After fetching data, fill below and other values
          value: "Khubaib Sajid",
          // Locked means this input should show lock icon and is not click able
          locked: true,
          editUrl: `${PAGE_BASE_URL}/editFullName`,
        },
        {
          label: "Email",
          // After fetching data, fill below and other values
          value: "Khubaib Sajid",
          locked: false,
          editUrl: `${PAGE_BASE_URL}/editEmail`,
        },
        {
          label: "Phone Number",
          // After fetching data, fill below and other values
          value: "+1234543546",
          locked: false,
          editUrl: `${PAGE_BASE_URL}/editPhone`,
        },
        {
          label: "Gender",
          // After fetching data, fill below and other values
          value: "Male",
          locked: false,
          editUrl: `${PAGE_BASE_URL}/editGender`,
        },
      ],
    },
  ];
  return (
    <div className=" w-full h-screen">
      {/* //! after fetching data pass the name to profile */}
      <ProfilePicture profileName="" />
      <div className="mt-8">
        {profileUIStructure.map((p) => (
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

export default page;
