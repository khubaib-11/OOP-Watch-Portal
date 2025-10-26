"use client";
import EditProfessionalDetailsInputWrapper from "@/components/EditProfessionalDetailsInputWrapper";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useUpdateProfession } from "@/hooks/useProfessionalDetailsScreenData";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { useEffect } from "react";

const schema = z.object({
  profession: z
    .string()
    .min(3, "Please add more than 3 characters")
    .max(25, "Your profession can not be longer than 25 characters"),
});

type EducationSchema = z.infer<typeof schema>;

function EditEducationPage() {
  const router = useRouter();
  const { mutate, isError, isSuccess, isPending } = useUpdateProfession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: EducationSchema) {
    mutate(data.profession);
  }

  useEffect(() => {
    if (isSuccess) {
      toast("Profession updated successfully.");
      router.back();
    }
    if (isError) {
      toast("Failed to updated profession.");
    }
  }, [isError, isSuccess, router]);

  return (
    <EditProfessionalDetailsInputWrapper
      heading="Profession"
      hint="You can edit your profession here."
      inputLabel="Profession (e.g Teacher, Shopkeeper)"
      onClickUpdate={handleSubmit(onClickUpdate)}
      isLoading={isPending}
    >
      <Input
        className="bg-gray-50"
        type="text"
        {...register("profession")}
      />
      {errors ? (
        <p className="text-red-500 font-medium mb-2 mt-1">
          {errors.profession?.message}
        </p>
      ) : null}
    </EditProfessionalDetailsInputWrapper>
  );
}

export default EditEducationPage;
