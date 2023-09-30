import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const HomePage = (): JSX.Element => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center w-full h-screen">
        {/* Adjust height as needed */}
        <div className="absolute inset-0">
          <Image
            src={"/images/home.png"}
            layout={"fill"}
            alt="home.png"
            objectFit={"cover"}
            objectPosition={"center"}
          />
        </div>
        <Link href={"/collections/basics"}>
          <Button className="z-10 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[50px] bg-white text-black hover:bg-white hover:text-black hover:scale-105 transition ease-in-out duration-200 rounded-none text-lg">
            SHOP
          </Button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;