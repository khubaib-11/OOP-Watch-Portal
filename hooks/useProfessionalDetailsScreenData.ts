import {
  getProfessionalDetailsScreenData,
  updateEducation,
  updateProfession,
} from "@/api/professionalDetailsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfessionalDetailsScreenData = function () {
  return useQuery({
    queryKey: ["professionalDetailsScreenData"],
    queryFn: getProfessionalDetailsScreenData,
  });
};

export const useUpdateEducation = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (e: string) => updateEducation(e),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professionalDetailsScreenData"],
      });
    },
  });
};
export const useUpdateProfession = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (p: string) => updateProfession(p),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professionalDetailsScreenData"],
      });
    },
  });
};
