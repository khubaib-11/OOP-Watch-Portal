import { useProfileScreenData } from "@/hooks/useProfileScreenData";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
import { HardDriveUpload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

const uploadAvatar = async (file: File) => {
  const supabase = createClient();
  let compressedFile = file;

  // 1. Compress if needed
  const maxSizeBytes = 1024 * 1024; // 1MB
  if (file.size > maxSizeBytes) {
    console.log("File is larger than 1MB, compressing...");
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    compressedFile = await imageCompression(file, options);
    console.log("File compressed:", compressedFile.size / 1024 / 1024, "MB");
  }

  // 2. Get user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found. Please log in again.");
  }

  // 3. Prepare path
  const fileExtension = compressedFile.name.split(".").pop();
  const filePath = `${user.id}/avatar.${fileExtension}`; // Path: user_id/avatar.png

  // 4. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, compressedFile, {
      cacheControl: "0",
      upsert: true, // Overwrites existing file
    });
  if (uploadError) throw uploadError;

  // 5. Get Public URL
  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const publicUrl = urlData.publicUrl;
  if (!publicUrl) throw new Error("Could not get public URL.");

  // 6. Update Profile
  const { error: dbError } = await supabase
    .from("profiles")
    .update({ profile_picture_url: publicUrl })
    .eq("id", user.id);
  if (dbError) throw dbError;

  // 7. Return the new URL (this will be the `data` in onSuccess)
  return publicUrl;
};

function ProfilePicture({
  profileName = "Not provided",
}: {
  profileName?: string;
}) {
  const router = useRouter();
  const { data: profileScreenData } = useProfileScreenData();
  const profilePictureUrl =
    profileScreenData?.profile?.[0]?.profile_picture_url;
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
  const queryClient = useQueryClient();
  // Setup the mutation
  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: uploadAvatar, // The function to call
    onSuccess: () => {
      // Runs when the mutation is successful
      alert("Profile picture updated successfully!");

      // **This is the React Query way to update your UI:**
      // Invalidate any queries that fetch profile data.
      // This tells React Query to refetch the profile, which will
      // automatically update the avatar URL everywhere in your app.
      // Replace 'profile' with your actual query key for fetching the profile.
      queryClient.invalidateQueries({ queryKey: ["profileScreenData"] });
      router.refresh();

      // If you are storing the avatar URL in this component's state,
      // you could update it here:
      // setAvatarUrl(newUrl);
    },
    onError: (error: Error) => {
      // Runs when the mutation throws an error
      console.error("Error in upload process:", error);
      toast(`Failed to upload: ${error.message}`);
    },
    onSettled: () => {
      // Runs after success or error (like `finally`)
      // Clear the file input
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    },
  });

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return; // No file selected
    }
    const selectedFile = event.target.files[0];

    // 1. Validate file type before mutation
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Please select a PNG or JPEG image.");
      // Clear the input
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }

    // 2. Call the mutation. React Query handles the rest.
    mutate(selectedFile);
  }

  return (
    <div className="flex gap-4 items-center p-4  rounded-lg">
      {/* Profile picture placeholder */}
      {!profilePictureUrl ? (
        <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center">
          <span className="text-xs text-gray-500">{profileName}</span>
        </div>
      ) : (
        <div className="rounded-full w-[64px] h-[64px] overflow-hidden">
          <Image
            src={profilePictureUrl}
            width={64}
            height={64}
            alt="User avatar"
            className="object-cover w-full h-full"
          />
        </div>
      )}

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
          disabled={isUploading}
        >
          <HardDriveUpload className="w-4 h-4" />
          {isUploading ? <Spinner /> : "Upload Photo"}
        </Button>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, or JPEG. 2MB max.
        </p>
      </div>
    </div>
  );
}

export default ProfilePicture;
