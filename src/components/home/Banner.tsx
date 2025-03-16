import { mobilescreen } from "@/assets";
import Image from "next/image";
import { RiHandbagLine } from "react-icons/ri";
import { TfiWorld } from "react-icons/tfi";
import Searchbar from "./Searchbar";

const Banner = () => {
  return (
    <div className="flex items-start gap-10 justify-between">
      <div>
        <div className="relative w-full">
          <h1 className="text-[140px] font-bold leading-[150px]  w-fit">
            Your Dream <br /> Career Starts <br /> Here{" "}
          </h1>
          <p className="absolute bottom-3 font-normal text-xl right-52 text-primaryText/70 max-w-72">
            Job hunting made easy. Get stant alert from your dream jobs based on
            your skills and innovate job finder
          </p>
        </div>
        <div>
          <Searchbar />
        </div>
      </div>
      <div>
        <div className="bg-gradient-to-t from-primary001/50 to-transparent h-[500px] overflow-hidden flex items-center justify-center rounded-bl-none rounded-full">
          <Image
            src={mobilescreen}
            alt=""
            className="object-contain w-[60%] mt-28"
          />
        </div>
        <div className=" grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-4 bg-blue-500/10 h-80 w-60 items-center justify-center rounded-tl-none rounded-br-none rounded-[100px]">
            <RiHandbagLine className="text-6xl text-secondary001" />
            <p className="font-medium">Jobs</p>
            <p className="text-3xl font-medium">
              25000 <span className="text-secondary001">+</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 bg-red-500/5 h-80 w-60 items-center justify-center rounded-bl-none rounded-[100px]">
            <TfiWorld className="text-6xl text-primary001" />
            <p className="font-medium">Currencies</p>
            <p className="text-3xl font-medium">
              65 <span className="text-primary001">+</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
