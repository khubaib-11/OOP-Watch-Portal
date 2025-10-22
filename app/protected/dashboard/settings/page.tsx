"use client";
import FieldSection from "@/components/FieldSection";
import { Spinner } from "@/components/ui/spinner";
import { useSettings } from "@/hooks/useSettings";

const PAGE_BASE_URL = "/protected/dashboard/settings/edit";
function TasksAndTeamsScreen() {
  const { data, isLoading, error } = useSettings();
  let settingsUIStructure;
  if (data?.settings) {
    settingsUIStructure = [
      {
        section: "Engagement",
        inputFields: [
          {
            label: "WhatsApp contact consent",
            // After fetching data, fill below and other values
            value: data?.settings[0]?.allow_whatsapp_contact ?? "Not provided",
            // Locked means this input should show lock icon and is not click able
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editWhatsAppConsent`,
          },
          {
            label: "Logout",
            // After fetching data, fill below and other values
            value: "Logout from your account",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/logout`,
          },
          // {
          //   label: "Motivation",
          //   // After fetching data, fill below and other values
          //   value: data?.settings[0].motivation ?? "Not provided",
          //   locked: false,
          //   editUrl: `${PAGE_BASE_URL}/editMotivation`,
          // },
        ],
      },
    ];
  }

  if (isLoading) {
    return (
      <div className=" flex flex-col gap-4 flex-1 justify-center items-center">
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
        {settingsUIStructure?.map((p) => (
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

export default TasksAndTeamsScreen;
