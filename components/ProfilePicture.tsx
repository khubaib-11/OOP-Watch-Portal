import { HardDriveUpload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, useRef } from "react";

function ProfilePicture({
  profileName = "Not provided",
}: {
  profileName?: string;
}) {
  // Create a ref to get direct access to the hidden file input element
  const fileRef = useRef<HTMLInputElement>(null);

  /**
   * This function is triggered when the "Upload Photo" button is clicked.
   * It programmatically clicks the hidden file input to open the file explorer.
   */
  function handleButtonClick() {
    fileRef.current?.click();
  }

  /**
   * This function is triggered when a user selects a file from the explorer.
   * It accesses the selected file and logs it to the browser's console.
   * @param {ChangeEvent<HTMLInputElement>} event - The input change event
   */
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    // Check if files were selected
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      console.log("File selected:", selectedFile);
      // In the next step, you would start the upload process here.
    }
  }

  return (
    <div className="flex gap-4 items-center p-4  rounded-lg">
      {/* Profile picture placeholder */}
      <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center">
        {/* In a future step, you would display the selected image here */}
        <span className="text-xs text-gray-500">{profileName}</span>
      </div>

      {/* This input is hidden from the user but is required for file selection */}
      <Input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg" // Restrict to common image types
      />

      {/* This button is what the user interacts with */}
      <div className="flex flex-col gap-1">
        <Button
          variant="secondary"
          className="rounded-full gap-2"
          onClick={handleButtonClick}
        >
          <HardDriveUpload className="w-4 h-4" />
          Upload Photo
        </Button>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, or JPEG. 2MB max.
        </p>
      </div>
    </div>
  );
}

export default ProfilePicture;
