import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

function EditProfessionalDetailsInputWrapper({
  children,
  heading,
  hint,
  inputLabel,
  isLoading,
  onClickUpdate,
}: {
  children: React.ReactNode;
  heading: string;
  hint: string;
  inputLabel: string;
  isLoading: boolean;
  onClickUpdate: () => void;
}) {
  return (
    <div className=" max-w-[350px] mt-8 flex-col flex-1 ">
      <h1 className="text-2xl font-semibold mb-2">{heading}</h1>
      <p>{hint}</p>
      <div className="flex flex-col gap-2 mt-2">
        <label>{inputLabel}</label>
        {children}
      </div>
      <Button
        className="w-1/3"
        size="lg"
        onClick={onClickUpdate}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Update"}
      </Button>
    </div>
  );
}

export default EditProfessionalDetailsInputWrapper;
