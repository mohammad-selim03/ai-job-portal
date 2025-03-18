import { Button } from "@/components/ui/button";
import { FaUsers } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const Community = () => {
  return (
    <div className="py-20">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-primaryText">Join The Community</p>
          <h2 className="text-5xl font-medium capitalize">
            Building Your Network: the job finder community
          </h2>
          <p className="text-primaryText text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
            veniam ipsa, optio, assumenda earum ex numquam est obcaecati
            praesentium, id tenetur unde ipsam veritatis mollitia quo?
            Recusandae.
          </p>
          <div>
            <Button className="text-white rounded-full py-5 px-5">
              Get Started
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="bg-primary001/10 p-6 rounded-2xl">
              <p className="text-2xl font-medium">Jobs in Tech</p>
              <p className="text-sm py-4">
                Many tech companies foaster innovative and collaborative work
                environments. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, fugit!
              </p>
              <Button className="bg-black text-white px-5 py-2 rounded-full">
                Details
              </Button>
            </div>
            <div className="bg-primary001/10 p-6 rounded-2xl">
              <p className="text-2xl font-medium">Jobs in Tech</p>
              <p className="text-sm py-4">
                Many tech companies foaster innovative and collaborative work
                environments. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, tempore?
              </p>
              <Button className="bg-black text-white px-5 py-2 rounded-full">
                Details
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-secondary001/10 p-6 rounded-2xl">
              <div className="flex items-start justify-between">
                <p className="p text-6xl font-normal">20K +</p>
                <p>
                  <FaUsers className="text-primary001 text-4xl" />
                </p>
              </div>
              <p className="text-sm pb-5">User joined the community</p>
              <hr className="text-black h-2" />
              <div className="py-5">
                <p className="text-2xl font-medium">Salaries in Tech</p>
                <p className="mt-3">
                  Tech salaries are generally quite competitive compared to the
                  average across all occupations.
                </p>
                <div className="mt-14">
                  <Button className="px-5 py-3 rounded-full bg-black text-white">
                    Details
                  </Button>
                </div>
              </div>
            </div>

            <div className="">
              <Button className="px-5 w-full h-14 rounded-2xl bg-primary001/40 text-black hover:text-white group">
                More <FaArrowRightLong className="text-2xl group-hover:text-white group-hover:translate-x-3 transition-all duration-300"/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
