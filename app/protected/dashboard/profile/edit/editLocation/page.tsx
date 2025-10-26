"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateLocation } from "@/hooks/useProfileScreenData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  location: z
    .string()
    .min(3, "Your location must have at least 3 characters")
    .max(50, "Your location can not be longer than 25 characters"),
});

type LocationSchema = z.infer<typeof schema>;

function EditLocation() {
  const router = useRouter();
  const { mutate, isSuccess, isError, isPending } = useUpdateLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onClickUpdate(data: LocationSchema) {
    mutate(data.location);
  }

  useEffect(() => {
    if (isSuccess) {
      toast("Location updated successfully.");
      router.back();
    }

    if (isError) {
      toast("Failed to update location.");
    }
  }, [isSuccess, isError, router]);

  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Location</h1>
      <p>
        You can update your location here. Please write the location like this:
        Islamabad, Pakistan 🇵🇰
      </p>
      <div className="flex flex-col gap-2 mt-2">
        <label>Location : (City, Country, Emoji Flag)</label>
        <Input
          className="bg-gray-50"
          type="text"
          {...register("location")}
        />
        {errors ? (
          <p className="text-red-500 font-medium mb-2 mt-1">
            {errors.location?.message}
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

export default EditLocation;
