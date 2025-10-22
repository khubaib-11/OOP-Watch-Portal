"use client";
import EditProfessionalDetailsInputWrapper from "@/components/EditProfessionalDetailsInputWrapper";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { useUpdateMotivation } from "@/hooks/useTeamsAndTasks";

const schema = z.object({
  motivation: z
    .string()
    .min(3, "Please add more than 3 characters")
    .max(25, "Your motivation can not be longer than 25 characters"),
});

type MotivationSchema = z.infer<typeof schema>;

function EditEducationPage() {
  const router = useRouter();
  const { mutate, isError, isSuccess, isPending } = useUpdateMotivation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: MotivationSchema) {
    console.log(data);
    mutate(data.motivation);
  }

  if (isSuccess) {
    toast("Motivation updated successfully.");
    router.back();
  }
  if (isError) {
    toast("Failed to updated motivation.");
  }

  return (
    <EditProfessionalDetailsInputWrapper
      heading="Motivation"
      hint="You can edit your motivation here."
      inputLabel="Motivation"
      onClickUpdate={handleSubmit(onClickUpdate)}
      isLoading={isPending}
    >
      <Input
        className="bg-gray-50"
        type="text"
        {...register("motivation")}
      />
      {errors ? (
        <p className="text-red-500 font-medium mb-2 mt-1">
          {errors.motivation?.message}
        </p>
      ) : null}
    </EditProfessionalDetailsInputWrapper>
  );
}

export default EditEducationPage;
