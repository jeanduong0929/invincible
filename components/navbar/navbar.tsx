"use client";
import React from "react";
import Link from "next/link";
import UserDropdown from "./user-dropdown";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2,
  SearchIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

const Navbar = (): JSX.Element => {
  // States
  const [shopDropdown, setShopDropdown] = React.useState<boolean>(false);

  // Session
  const { data: session, status } = useSession();

  return (
    <>
      <div className="w-full border-b py-5">
        {/* Navbar container */}
        <nav className="flex items-center justify-between max-w-screen-xl mx-auto w-full">
          {/* Left side */}
          <LeftItems
            shopDropdown={shopDropdown}
            setShopDropdown={setShopDropdown}
          />

          {/* Right side */}
          <RightItems session={session} status={status} />

          {/* Shop dropdown */}
          {shopDropdown && <ShopDropdown />}
        </nav>
      </div>
    </>
  );
};

/* ######################################## LEFT ITEMS ######################################## */

interface LeftItemProps {
  shopDropdown: boolean;
  setShopDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftItems: React.FC<LeftItemProps> = ({
  shopDropdown,
  setShopDropdown,
}): JSX.Element => {
  // Refs
  const shopDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        shopDropdownRef.current &&
        !shopDropdownRef.current.contains(e.target as Node)
      ) {
        setShopDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [shopDropdown]);

  return (
    <>
      <div className="flex items-center gap-10">
        <Link href={"/"} className="flex items-center gap-5">
          <h1 className="text-4xl font-bold">INVINCIBLE</h1>
        </Link>

        <div
          ref={shopDropdownRef}
          className="flex items-center gap-2 hover:underline underline-offset-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShopDropdown(!shopDropdown);
          }}
        >
          <p>Shop</p>
          {shopDropdown ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </div>
      </div>
    </>
  );
};

/* ######################################## RIGHT ITEMS ######################################## */

interface RightItemProps {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

const RightItems: React.FC<RightItemProps> = ({
  session,
  status,
}): JSX.Element => {
  return (
    <>
      <div className="flex items-center gap-5">
        <SearchIcon className="h-6 w-6" />
        <Link href="/cart">
          <ShoppingBagIcon className="h-6 w-6" />
        </Link>

        {status === "loading" ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : session ? (
          <UserDropdown session={session} />
        ) : (
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </>
  );
};

/* ######################################## SHOP DROPDOWN ######################################## */

const ShopDropdown = (): JSX.Element => {
  const shopPages = [
    {
      id: 1,
      title: "Basics",
      path: "basics",
    },
    {
      id: 2,
      title: "Tops",
      path: "tops",
    },
    {
      id: 3,
      title: "Bottoms",
      path: "bottoms",
    },
  ];

  return (
    <>
      <div className="absolute w-full border-b left-0 top-20 z-20 bg-white border-t">
        <nav className="flex items-center gap-5 max-w-screen-xl mx-auto py-3">
          {shopPages.map((page) => (
            <Link
              className="hover:underline underline-offset-4"
              href={`/collections/${page.path}`}
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;