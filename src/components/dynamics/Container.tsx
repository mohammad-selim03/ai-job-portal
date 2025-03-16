import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
  return <div className={cn("px-[100px]", className)}>{children}</div>;
};

export default Container;
