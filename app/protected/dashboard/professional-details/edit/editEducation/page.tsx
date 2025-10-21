"use client";
import EditProfessionalDetailsInputWrapper from "@/components/EditProfessionalDetailsInputWrapper";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useUpdateEducation } from "@/hooks/useProfessionalDetailsScreenData";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  education: z
    .string()
    .min(3, "Please add more than 3 characters")
    .max(25, "Your education can not be longer than 25 characters"),
});

type EducationSchema = z.infer<typeof schema>;

function EditEducationPage() {
  const router = useRouter();
  const { mutate, isError, isSuccess, isPending } = useUpdateEducation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: EducationSchema) {
    console.log(data);
    mutate(data.education);
  }

  if (isSuccess) {
    toast("Education updated successfully.");
    router.back();
  }
  if (isError) {
    toast("Failed to updated education.");
  }

  return (
    <EditProfessionalDetailsInputWrapper
      heading="Education"
      hint="You can edit your education here."
      inputLabel="Education"
      onClickUpdate={handleSubmit(onClickUpdate)}
      isLoading={isPending}
    >
      <Input
        className="bg-gray-50"
        type="text"
        {...register("education")}
      />
      {errors ? (
        <p className="text-red-500 font-medium mb-2 mt-1">
          {errors.education?.message}
        </p>
      ) : null}
    </EditProfessionalDetailsInputWrapper>
  );
}

export default EditEducationPage;
