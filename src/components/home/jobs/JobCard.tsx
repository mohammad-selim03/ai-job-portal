import { FcGoogle } from "react-icons/fc";
import { BsBookmarkDash } from "react-icons/bs"; 
import { Button } from "@/components/ui/button";

const JobCard = () => {
  return (
    <div className="border border-gray-200 p-3 rounded-3xl">
      <div className="bg-primary001/10 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {" "}
            <p className="bg-white p-2 rounded-full">
              <FcGoogle className="text-3xl" />
            </p>
            <p className="bg-white px-5 py-3 rounded-full">5 minutes ago</p>
          </div>
          <div className="px-3 py-3 rounded-full bg-white">
            <p>
              <BsBookmarkDash className="text-2xl" />
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-medium">Google</p>
          <h3 className="text-3xl font-medium mt-2">
            Junior Machine Learning Engineer
          </h3>
          <div className="py-5 flex flex-wrap gap-4 text-sm">
            <p className="px-3 py-2 rounded-full border border-gray-300 w-fit text-primaryText">
              Full Time
            </p>
            <p className="px-3 py-2 rounded-full border border-gray-300 w-fit text-primaryText">
              Senior Level
            </p>
            <p className="px-3 py-2 rounded-full border border-gray-300 w-fit text-primaryText">
              Remote
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex flex-col gap-0">
          <p className="text-xl font-medium"> $120k-180k/Annual</p>
          <p className="text-lg text-primaryText">Jakarta, Indonesia</p>
        </div>
        <div>
          <Button className="bg-black text-white px-4 py-2 rounded-full">
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
