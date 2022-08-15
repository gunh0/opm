import Image from "next/image";
import { FunctionComponent } from "react";

import styles from "../../styles/Home.module.scss";

interface AdImageProps {
  src: string;
  containerClassName?: string;
  imageClassName?: string;
}

const AdImage: FunctionComponent<AdImageProps> = ({
  src,
  containerClassName = "",
  imageClassName = "",
}) => {
  return (
    <div className={`${styles.AdImageContainer} ${containerClassName}`}>
      <Image
        className={imageClassName}
        src={src}
        alt="img"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default AdImage;
