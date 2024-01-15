'use client'
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/services/apiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import { Button } from "../ui/button";
import AuthItems from "./AuthItems";
import Image from "next/image";
import Navlink from "./NavLink";
import { Router } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}



export default function Navbar() {
  
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    { name: "Team", href: "#", current: pathname=== "/team" },
    { name: "Projects", href: "#", current: pathname === "/projects" },
    { name: "Dashboard", href: "/dashboard", current: pathname === "/dashboard" },
  ];

  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const [ logout ] = useLogoutMutation();

  //handle logout
  const handleLogout= () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .finally(()=> {
      })
  }

  // auth Links
  const authLinks =(isMobile: boolean) => (
    <>
     <Navlink
      isMobile={isMobile}
      isSelected={pathname === '/notes' ? true : false}
      href="/notes"

      >
        Notes
      </Navlink>
     
      <Navlink
      isSelected={pathname === '/dashboard' ? true : false}
      isMobile={isMobile}
      href="/dashboard "
      >
        Dashboard
      </Navlink>
      <Navlink
      isMobile={isMobile}
      onClick={handleLogout}
      >
        Logout
      </Navlink>
    </>
  );

  // guest Links
  const Links = (isMobile: boolean) => (
    <>
      <Navlink 
      isSelected={pathname === '/' ? true : false}
      isMobile={isMobile}
      href="/"
      >
        Home
      </Navlink>
      <Navlink
      isSelected={pathname === '/transfers' ? true : false}
      isMobile={isMobile}
      href="/transfers"
      >
        Transfers
      </Navlink>
      <Navlink
      isSelected={pathname === '/contact' ? true : false}
      isMobile={isMobile}
      href="/contact">
        Contact
      </Navlink>
    </>
  );


  return (
    <header className="bg-gray-800">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                  className="h-8 w-auto"
                  src="/next.svg"
                  alt="Your Company"
                  width={100}
                  height={100}
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-2">
                  {Links(false)}
                  
                  { isAuthenticated ? authLinks(false)
                  : null }
                </div>
              </div>
            </div>
            
              {isAuthenticated ? < AuthItems /> : 
              <Link href="/auth/login">
              <Button  variant="outline"> Login</Button>
              </Link>
              }
              
          </div>
        </div>
      </>
    </header>
  );
}
