import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";

const Searchbar = () => {
  return (
    <div className="flex items-center gap-2 mt-10 w-full">
      <div className="relative w-full">
        <input
          type="text"
          className="px-5 py-4 rounded-full bg-gray-100/50 border border-gray-200 outline-none w-full pe-10"
          placeholder="Search your dream jobs..."
        />
        <span className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2">
          <IoSearchOutline className="text-gray-500 text-xl" />
        </span>
      </div>
      <div>
        <Button className="bg-primary001 border border-primary001 px-8 py-7 rounded-full text-white">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Searchbar;
