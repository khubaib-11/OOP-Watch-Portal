import {
  getTeamsAndTasksScreenData,
  updateMotivation,
} from "@/api/teamsAndTasksApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTeamsAndTasksScreenData = function () {
  return useQuery({
    queryKey: ["teamsAndTasksScreen"],
    queryFn: getTeamsAndTasksScreenData,
  });
};

export const useUpdateMotivation = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (m: string) => updateMotivation(m),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamsAndTasksScreen"] });
    },
  });
};
