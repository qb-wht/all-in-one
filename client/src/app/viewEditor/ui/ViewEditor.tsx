import Image from "next/image";
import f from "./view.png";

export const ViewEditor = () => {
  return (
    <div className="center">
      <Image
        style={{ width: "60rem", height: "40rem" }}
        src={f}
        alt="View Editor"
      />
    </div>
  );
};
