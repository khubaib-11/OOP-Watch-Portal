import { ChevronRight, LockIcon } from "lucide-react";
import Link from "next/link";

function FieldList({
  label,
  value,
  locked = false,
  editUrl,
}: {
  label: string;
  value: string | number;
  locked: boolean;
  editUrl: string;
}) {
  return (
    <Link href={`${locked ? "" : editUrl}`}>
      <div
        key={label}
        className={`flex justify-between items-center border-b py-4 px-4  hover:bg-gray-200 cursor-pointer ${
          locked ? "bg-gray-100 hover:bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        <div>
          <p className="font-medium my-2">{label}</p>
          {/* //! Converting the value to string if the coming value is number or anything else. */}
          <p>{String(value)}</p>
        </div>
        {locked ? (
          <LockIcon className="w-6 h-6" />
        ) : (
          <ChevronRight className="w-6 h-6" />
        )}
      </div>
    </Link>
  );
}

export default FieldList;
