import {
  getProfileScreenData,
  updateAge,
  updateEmail,
  updateGender,
  updateLocation,
  updatePhone,
  updateUserName,
} from "@/api/profileApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfileScreenData = function () {
  return useQuery({
    queryKey: ["profileScreenData"],
    queryFn: getProfileScreenData,
  });
};

export const useUpdateUserName = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => updateUserName(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileScreenData"] });
    },
  });
};
export const useUpdateEmail = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => updateEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileScreenData"] });
    },
  });
};
export const useUpdatePhone = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (phone: string) => updatePhone(phone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileScreenData"] });
    },
  });
};
export const useUpdateLocation = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (location: string) => updateLocation(location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileScreenData"] });
    },
  });
};
export const useUpdateAge = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (age: string) => updateAge(age),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileScreenData"] });
    },
  });
};
export const useUpdateGender = function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gender: "Male" | "Female") => updateGender(gender),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileScreenData"] });
    },
  });
};
