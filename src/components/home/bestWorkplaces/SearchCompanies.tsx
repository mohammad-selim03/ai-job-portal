import { Button } from "@/components/ui/button";
import { IoSearchOutline } from "react-icons/io5";
import ComapniesCard from "./ComapniesCard";

const SearchCompanies = () => {
  return (
    <div>
      <div className="flex items-start justify-between gap-10 py-20">
        <div>
          <p className="text-primaryText">Top Companies</p>
          <h2 className="text-6xl font-medium">Best places to work 2025</h2>
        </div>
        <div>
          <p className="text-primaryText">
            Leverage the job finder&apos;s company review section to gain
            insights into employee experience in different companies
          </p>
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
        </div>
      </div>
      <div className="py-10 grid grid-cols-3 gap-4">
        <ComapniesCard />
      </div>
    </div>
  );
};

export default SearchCompanies;
