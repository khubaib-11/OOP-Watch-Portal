import { getSettingsScreenData } from "@/api/settingsApi";
import { useQuery } from "@tanstack/react-query";

export const useSettings = function () {
  return useQuery({
    queryKey: ["settingsScreen"],
    queryFn: getSettingsScreenData,
  });
};
