"use client";

import Image from "next/image";

interface GalleryContentImageProps {
  url: string;
}

const GalleryContentImage = ({ url }: GalleryContentImageProps) => {
  return (
    <div className="w-80 h-80 my-6 aspect-square sm:rounded-lg overflow-hidden relative">
      <Image
        src={url}
        alt={url}
        className="w-full h-full object-contain"
        fill
      />
    </div>
  );
};

export default GalleryContentImage;
