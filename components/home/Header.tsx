import React from "react";
import { Card, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { MessageCircleIcon, PencilIcon, StickyNoteIcon, TruckIcon } from "lucide-react";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <div className="w-full h-12 px-10  border border-gray-500 rounded-xl my-4 flex justify-center hover:border-indigo-600 hover:text-indigo-600  ">
        <p className="my-auto mx-auto">Welcome to website</p>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Card className=" h-48 bg-nakliye2 bg-cover  "></Card>
          <div className="flex flex-wrap gap-2 mx-auto h-20 ">
            {/*  Nakliye ilanları */}
            <Link href="/transfers" className="box ">
              <Card className="flex-1 h-full bg-blue-500  flex items-center   ">
                <Label className="text-white w-full h-full cursor-pointer px-2 flex items-center gap-2 hover:gap-16   transition-all duration-1000">
                  Nakliye ilanları<TruckIcon />
                </Label>
              </Card>
            </Link>
            {/* Notlar */}
            <Link href="/notes" className="box ">
              <Card className="flex-1 h-full bg-cyan-500   flex items-center   ">
                <Label className="text-white w-full h-full cursor-pointer px-2 flex items-center gap-2 hover:gap-16  transition-all duration-1000">
                  Kişisel Notlar<PencilIcon  />
                </Label>
              </Card>
            </Link>
            {/* ekstra */}
            <Link href="/transfers" className="box ">
              <Card className="flex-1 h-full bg-orange-500   flex items-center   ">
                <Label className="text-white w-full h-full cursor-pointer px-2 flex items-center gap-2 hover:gap-16  transition-all duration-1000">
                  Canlı Sohbet<MessageCircleIcon />
                </Label>
              </Card>
            </Link>
          </div>
        </div>
        <Card className="flex-1 h-68 bg-nakliye1 bg-cover relative">
          <CardFooter className=" absolute bottom-2 left-2">
            <Label className="text-white text-3xl "> </Label>
          </CardFooter>
        </Card>
      </div>
    </header>
  );
};

export default Header;
