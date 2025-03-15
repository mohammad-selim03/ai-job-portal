import { logo } from "@/assets";
import { navItems } from "@/lib/StaticData";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-5 py-5 px-5">
      <Link href={"/"} className="flex items-center gap-0">
        <Image src={logo} alt="logo" className="w-20" /> <p>Hire Me</p>
      </Link>
      <div className="flex items-center gap-5">
        {navItems?.map((item, idx) => (
          <Link key={`indedx - ${idx}`} href={item?.path} className="font-medium">
            {item?.title}
          </Link>
        ))}
      </div>
      <Link href={"/register"} className="flex items-center gap-5"> 
        <Button className="bg-bacprimary001 text-white  rounded-full px-5 h-12 rounded-bl-none">Join with us!</Button> 
      </Link>
    </div>
  );
};

export default Navbar;
