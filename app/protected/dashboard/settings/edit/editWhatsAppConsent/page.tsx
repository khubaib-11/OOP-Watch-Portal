"use client";
import { Switch } from "@/components/ui/switch";

function page() {
  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">
        Change WhatsApp contact consent
      </h1>
      <p>
        You can change the whatsapp consent by using this toggle. When allowed,
        we will contact you on whatsapp otherwise we will not contact you on
        whatsapp.
      </p>

      <div className="flex justify-between items-center mt-8">
        <p>WhatsApp contact consent</p>
        <Switch />
      </div>
    </div>
  );
}

export default page;
