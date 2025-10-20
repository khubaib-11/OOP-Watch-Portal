import { HardDriveUpload } from "lucide-react";
import { Button } from "./ui/button";

function ProfilePicture({
  profileName = "Not provided",
}: {
  profileName: string;
}) {
  return (
    <div className="flex gap-4 items-center">
      {/* //! Below div is for profile picture. In next phase change it with next image */}
      <div className="w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center">
        <p>{profileName}</p>
      </div>
      <Button
        variant="secondary"
        className="rounded-full"
      >
        <HardDriveUpload className="w-4 h-4" />
        Upload photo
      </Button>
    </div>
  );
}

export default ProfilePicture;
