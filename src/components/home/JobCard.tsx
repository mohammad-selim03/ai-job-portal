import { FcGoogle } from "react-icons/fc";
import { BsBookmarkDash } from "react-icons/bs";

const JobCard = () => {
  return (
    <div className="border border-gray-200 p-2 rounded-3xl">
      <div className="bg-primary001/10 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {" "}
            <p className="bg-white p-2 rounded-full">
              <FcGoogle />
            </p>
            <p className="bg-white px-5 py-3 rounded-full">5 minutes ago</p>
          </div>
          <div className="px-3 py-2 rounded-full bg-white">
            <p>
              <BsBookmarkDash />
            </p>
          </div>
        </div>
        <div>
          <p>Google</p>
          <h3 className="text-3xl font-medium">
            Junior Machine Learning Engineer
          </h3>
          <div className="py-5">
            <p className="px-3 py-2 rounded-full border border-gray-300 w-fit text-primaryText">Full Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
