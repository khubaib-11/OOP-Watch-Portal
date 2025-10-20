"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePhone } from "@/hooks/useProfileScreenData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  phone: z
    .string()
    .max(15, {
      message: "Please provide a valid phone number",
    })
    .min(2, {
      message: "Please provide a valid phone number",
    }),
});

type PhoneSchema = z.infer<typeof schema>;

function EditPhone() {
  const { mutate, data, error } = useUpdatePhone();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: PhoneSchema) {
    console.log(data);
    mutate(data.phone);
  }

  if (data) {
    toast("Phone number updated successfully.");
    // router.back();
  }
  if (error) {
    toast("Failed to updated phone number.");
  }

  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Phone Number</h1>
      <p>You can update your phone number here</p>
      <div className="flex flex-col gap-2 mt-2">
        <label>Phone Number</label>
        <Input
          className="bg-gray-50"
          type="tel"
          {...register("phone")}
        />
        {errors ? (
          <p className="text-red-500 font-medium mb-2 mt-1">
            {errors.phone?.message}
          </p>
        ) : null}
      </div>
      <Button
        className="w-1/3"
        size="lg"
        onClick={handleSubmit(onClickUpdate)}
      >
        Update
      </Button>
    </div>
  );
}

export default EditPhone;
