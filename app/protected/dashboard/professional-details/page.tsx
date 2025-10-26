"use client";
import FieldSection from "@/components/FieldSection";
import { Spinner } from "@/components/ui/spinner";
import { useProfessionalDetailsScreenData } from "@/hooks/useProfessionalDetailsScreenData";

const PAGE_BASE_URL = "/protected/dashboard/professional-details/edit";
function ProfessionalDetailsScreen() {
  const { data, isLoading, error } = useProfessionalDetailsScreenData();
  let profileUIStructure;
  if (data?.professionalDetails) {
    profileUIStructure = [
      {
        section: "Professional Details ",
        inputFields: [
          {
            label: "Education",
            // After fetching data, fill below and other values
            value: data?.professionalDetails[0].education ?? "Not provided",
            // Locked means this input should show lock icon and is not click able
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editEducation`,
          },
          {
            label: "Profession",
            // After fetching data, fill below and other values
            value: data?.professionalDetails[0].profession ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editProfession`,
          },
        ],
      },
      // {
      //   section: "Core skills",
      //   inputFields: [
      //     {
      //       label: "Skills & Skills Level (e.g., Python - Advanced)",
      //       // After fetching data, fill below and other values
      //       value: data?.professionalDetails[0].age ?? "Not provided",
      //       // Locked means this input should show lock icon and is not click able
      //       locked: true,
      //       editUrl: `${PAGE_BASE_URL}/editAge`,
      //     },
      //     {
      //       label: "Languages Skills (e.g., Urdu - Fluent)",
      //       // After fetching data, fill below and other values
      //       value: data?.professionalDetails[0].gender ?? "Not provided",
      //       locked: true,
      //       editUrl: `${PAGE_BASE_URL}/editGender`,
      //     },
      //   ],
      // },
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

export default ProfessionalDetailsScreen;
