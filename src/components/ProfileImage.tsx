import Image from "next/image";

interface ProfileImageProps {
  imageSrc?: string | null | undefined
  className?: string
}

export default function ProfileImage({ imageSrc, className = "" }: ProfileImageProps) {

  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full self-center border border-amber-200 ${className}`}
    >
      <Image src={imageSrc ?? '/mystery-avatar.svg'} alt="Profile Image" quality={100} fill />
    </div>
  );
}