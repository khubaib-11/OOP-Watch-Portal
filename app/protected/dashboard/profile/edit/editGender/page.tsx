"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

function EditGender() {
  function onClickUpdate() {}
  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">Gender</h1>
      <div className="flex flex-col gap-2 mt-2">
        <label>Gender</label>
        {/* <Input
          className="bg-gray-50"
          type="tel"
          {...register("phone")}
        /> */}
        <Select>
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
        onClick={onClickUpdate}
      >
        Update
      </Button>
    </div>
  );
}

export default EditGender;
