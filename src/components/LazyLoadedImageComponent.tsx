import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  image: string;
  compressedImage: string;
  alt: string;
  className?: string;
};
const Image: FC<{ image: string; alt: string; className?: string }> = ({
  image,
  alt,
  className,
}) => {
  return (
    <img
      src={image}
      alt={alt}
      aria-label={alt}
      className={
        (twMerge("w-full h-full object-contain rounded-lg"), className)
      }
      loading="lazy"
    />
  );
};
const LazyLoadedImageComponent: FC<Props> = ({
  image,
  compressedImage,
  alt,
  className,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      {isImageLoaded ? (
        <Image image={image} alt={alt} className={className} />
      ) : (
        // <Skeleton height="100%" width="100%" />
        <Image image={compressedImage} alt={alt} className={className} />
      )}
      <img
        src={image}
        alt={alt}
        onLoad={handleImageLoad}
        className="hidden"
      />
    </>
  );
};

export default LazyLoadedImageComponent;
