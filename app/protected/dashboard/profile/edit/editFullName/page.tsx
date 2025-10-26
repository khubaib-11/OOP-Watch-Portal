"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateUserName } from "@/hooks/useProfileScreenData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  full_name: z
    .string()
    .min(3, "Your name must have at least 3 characters")
    .max(25, "Your name can not be longer than 25 characters"),
});

type FullNameSchema = z.infer<typeof schema>;

function EditFullName() {
  const router = useRouter();
  const { mutate, isSuccess, isError, isPending } = useUpdateUserName();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: FullNameSchema) {
    mutate(data.full_name);
  }

  useEffect(() => {
    if (isSuccess) {
      toast("Full name updated successfully.");
      router.back();
    }

    if (isError) {
      toast("Failed to update full name.");
    }
  }, [isSuccess, isError, router]);

  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Full Name</h1>
      <p>You can update your full name here</p>
      <div className="flex flex-col gap-2 mt-2">
        <label>Full Name</label>
        <Input
          className="bg-gray-50"
          type="text"
          {...register("full_name")}
        />
        {errors ? (
          <p className="text-red-500 font-medium mb-2 mt-1">
            {errors.full_name?.message}
          </p>
        ) : null}
      </div>
      <Button
        className="w-1/3"
        size="lg"
        onClick={handleSubmit(onClickUpdate)}
      >
        {isPending ? <Spinner /> : "Update"}
      </Button>
    </div>
  );
}

export default EditFullName;
