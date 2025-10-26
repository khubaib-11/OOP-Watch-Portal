"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useUpdateGender } from "@/hooks/useProfileScreenData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

function EditGender() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female" | "">(
    ""
  );
  const { mutate, isSuccess, isError, isPending } = useUpdateGender();

  function onClickUpdate(g: "Male" | "Female" | "") {
    if (!g) return;
    mutate(g);
  }

  useEffect(() => {
    if (isSuccess) {
      toast("Gender updated successfully.");
      router.back();
    }

    if (isError) {
      toast("Failed to update gender.");
    }
  }, [isSuccess, isError, router]);

  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Gender</h1>
      <div className="flex flex-col gap-2 mt-2">
        <label>Gender</label>
        <Select
          onValueChange={(v: "Male" | "Female") => setSelectedGender(v)}
          defaultValue={selectedGender}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genders</SelectLabel>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-1/3 mt-4"
        size="lg"
        onClick={() => onClickUpdate(selectedGender)}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : "Update"}
      </Button>
    </div>
  );
}

export default EditGender;
