import SlotCounter from "react-slot-counter";

const Connect = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-primary001/10 py-10">
        <p className="text-primaryText">Join And Connect Today</p>
        <h1 className="text-4xl font-semibold">Experience With Number</h1>
        <div className="py-5 grid grid-cols-3 gap-5 mt-10">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl text-primary001 font-semibold text-primary01 flex items-center">
              <SlotCounter animateOnVisible={true} duration={2} value={95} />%
            </h3>
            <p>User Finds their relavents job according to the skills</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl text-primary001 font-semibold text-primary01 flex items-center">
              <SlotCounter animateOnVisible={true} duration={2} value={95} />%
            </h3>
            <p>User Finds their relavents job according to the skills</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl text-primary001 font-semibold text-primary01 flex items-center">
              <SlotCounter animateOnVisible={true} duration={2} value={95} />%
            </h3>
            <p>User Finds their relavents job according to the skills</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
