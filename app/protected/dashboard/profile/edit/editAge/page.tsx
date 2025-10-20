"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAge } from "@/hooks/useProfileScreenData";
import { toast } from "sonner";

const schema = z.object({
  age: z.string(),
});

type AgeSchema = z.infer<typeof schema>;

function EditAge() {
  const { mutate, data, error } = useUpdateAge();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: AgeSchema) {
    mutate(String(data.age));
  }

  if (data) {
    toast("Age updated successfully.");
  }
  if (error) {
    toast("Failed to updated age.");
  }

  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Age</h1>
      <p>You can update your age here</p>
      <div className="flex flex-col gap-2 mt-2">
        <label>Full Name</label>
        <Input
          className="bg-gray-50"
          type="number"
          {...register("age")}
        />
        {errors ? (
          <p className="text-red-500 font-medium mb-2 mt-1">
            {errors.age?.message}
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

export default EditAge;
