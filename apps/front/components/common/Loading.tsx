import Image from "next/image";
import { FunctionComponent } from "react";

interface LoadingProps {
  width?: string;
  height?: string;
  position?: NonNullable<JSX.IntrinsicElements["div"]["style"]>["position"];
}

const Loading: FunctionComponent<LoadingProps> = ({
  width = "300px",
  height = "300px",
  position = "relative",
}) => {
  return (
    <div style={{ width, height, position }}>
      <Image src="/loading.gif" layout="fill" alt="loading" />
    </div>
  );
};

export default Loading;
