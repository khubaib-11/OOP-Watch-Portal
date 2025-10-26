"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateEmail } from "@/hooks/useProfileScreenData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({
    message: "Please provide a valid email address",
  }),
});

type EmailSchema = z.infer<typeof schema>;

function EditEmailPage() {
  const router = useRouter();
  const { mutate, isPending, isError, isSuccess } = useUpdateEmail();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: EmailSchema) {
    mutate(data.email);
  }

  useEffect(() => {
    if (isSuccess) {
      toast("Age updated successfully.", {});
      router.back();
    }

    if (isError) {
      toast("Failed to update age.");
    }
  }, [isSuccess, isError, router]);

  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Email</h1>
      <p>You can update your email here</p>
      <div className="flex flex-col gap-2 mt-2">
        <label>Email</label>
        <Input
          className="bg-gray-50"
          type="text"
          {...register("email")}
        />
        {errors ? (
          <p className="text-red-500 font-medium mb-2 mt-1">
            {errors.email?.message}
          </p>
        ) : null}
      </div>
      <Button
        className="w-1/3"
        size="lg"
        onClick={handleSubmit(onClickUpdate)}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : "Update"}
      </Button>
    </div>
  );
}

export default EditEmailPage;
