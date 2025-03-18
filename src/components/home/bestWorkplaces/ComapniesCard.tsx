import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const ComapniesCard = () => {
  return (
    <div className="relative">
      <div className="bg-primary001/10 p-6 rounded-3xl">
        <div className="h-12 w-12 flex items-center justify-center bg-white p-1 rounded-full">
          logo
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <p className="text-primaryText">Upwork</p>
          <h2 className="text-3xl font-medium">
            Upwork is popular online platform
          </h2>
          <p className="text-sm text-primaryText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit neque
            voluptatum commodi aliquam nemo pariatur aut repudiandae, voluptatem
            consequatur, illo nesciunt eius quidem? Laborum consequatur beatae
            neque, tempora vero dicta?
          </p>
        </div>
        <div className="absolute top-0 -right-5 h-16 w-16 bg-white px-4 rounded-2xl">
          <Button className="h-16 w-16 bg-black text-white flex items-center justify-center rounded-2xl">
            <FaArrowRightLong className="text-5xl text-white rotate-[-45deg]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComapniesCard;
