import SlotCounter from "react-slot-counter";

const Connect = () => {
  return (
    <div className="py-20 w-full">
      <div className="flex flex-col items-center justify-center bg-primary001/10 py-20 w-full">
        <p className="text-primaryText">Join And Connect Today</p>
        <h1 className="text-4xl font-medium mt-5">Experience With Number</h1>
        <div className="py-5 grid grid-cols-3 gap-20 mt-10">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl text-primary001 font-semibold text-primary01 flex items-center">
              <SlotCounter animateOnVisible={true} duration={2} value={95} />%
            </h3>
            <p>User Finds their relavents job according to the skills</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl text-primary001 font-semibold text-primary01 flex items-center">
              <SlotCounter animateOnVisible={true} duration={2} value={90} />%
            </h3>
            <p>Data Filtering from companies does not take long</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl text-primary001 font-semibold text-primary01 flex items-center">
              <SlotCounter animateOnVisible={true} duration={2} value={98} />%
            </h3>
            <p>Many top employeers and can connect with Hire me</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
