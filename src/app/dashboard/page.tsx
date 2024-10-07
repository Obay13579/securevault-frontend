import Image from "next/image";
import Header from "@/public/assets/1(1).png";
import Header2 from "@/public/assets/2(1).png";

export default function Home() {
  return (
    <div>
      <div className="w-full h-auto">
        <Image
          src={Header}
          alt="Header or Branding"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full h-auto">
        <Image
          src={Header2}
          alt="Header or Branding"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
