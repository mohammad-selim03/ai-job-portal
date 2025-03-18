import { SelectDemo } from "../../dynamics/SelectDemo";
import JobsCategories from "./JobsCategories";

const JobsSearch = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-2xl font-medium text-primaryText text-center">
        Explore your dream jobs
      </h3>
      <div className="mt-5">
        <h1 className="text-[64px] font-medium text-center">
          Just one click far to your{" "} <br />
          <span className="text-primary001">dream jobs</span>
        </h1>
        <div className="py-10 relative w-full">
          <input
            type="text"
            className="px-5 py-3 rounded-full border border-gray-200 outline-none w-full pe-20"
            placeholder="Search..."
          />
          <div className="absolute top-1/2 -right-10 -translate-x-1/2 -translate-y-1/2 w-24">
            <SelectDemo
              data={[{ title: "Dhaka" }, { title: "Bogura" }]}
              placeholder={"Location"}
            />
          </div>
        </div>
        <div className="py5">
          <p className="text-2xl font-medium text-primary001 text-center">
            {" "}
            Upload your resume - let&apos;s reqruiters find you.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <JobsCategories />
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default JobsSearch;
