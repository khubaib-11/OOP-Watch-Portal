"use client";
import FieldSection from "@/components/FieldSection";
import { Spinner } from "@/components/ui/spinner";
import { useTeamsAndTasksScreenData } from "@/hooks/useTeamsAndTasks";

const PAGE_BASE_URL = "/protected/dashboard/tasksAndTeams/edit";
function TasksAndTeamsScreen() {
  const { data, isLoading, error } = useTeamsAndTasksScreenData();
  console.log(data);
  let profileUIStructure;
  if (data?.teamsAndTasks) {
    profileUIStructure = [
      {
        section: "Engagement",
        inputFields: [
          // {
          //   label: "Teams",
          //   // After fetching data, fill below and other values
          //   value: data?.teamsAndTasks[0].user_teams ?? "Not provided",
          //   // Locked means this input should show lock icon and is not click able
          //   locked: true,
          //   editUrl: `${PAGE_BASE_URL}/editTeams`,
          // },
          // {
          //   label: "Current Tasks",
          //   // After fetching data, fill below and other values
          //   value: data?.teamsAndTasks[0].user_teams ?? "Not provided",
          //   locked: true,
          //   editUrl: `${PAGE_BASE_URL}/editTasks`,
          // },
          {
            label: "Motivation",
            // After fetching data, fill below and other values
            value: data?.teamsAndTasks[0].motivation ?? "Not provided",
            locked: false,
            editUrl: `${PAGE_BASE_URL}/editMotivation`,
          },
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

export default TasksAndTeamsScreen;
