"use client";
import Image from "next/image";
import React from "react";
import { Label } from "../ui/label";
import { DashboardPostList } from "./DashboardPostList";

interface Props {
  user?: {
    first_name: string;
    last_name: string;
    email: string;
    profile_picture?: string;
    address?: string;
    detail?: string;
    phone?: string;
    posts?: [];

  };
}

const DashboardList = ({ user }: Props) => {
  console.log(user);
  return (
    <div>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <div>
                  {user?.profile_picture ? (
                    <Image
                      src={user.profile_picture}
                      alt="My Image"
                      width={500}
                      height={300}
                    />
                  ) : (
                    "Resim yüklenemedi"
                  )}
                </div>
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Connect
              </button>{" "}
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Message
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.first_name} {user?.last_name}
            </h1>{" "}
            <p className="font-light text-gray-600 mt-3">{user?.address}</p>{" "}
            <p className="mt-8 text-gray-500">
              {user?.phone}
            </p>{" "}
            <Label className="text-md py-2 px-4 mt-10">
              {" "}
              {user?.detail}
            </Label>
          </div>{" "}
          <div className="mt-12 ">
            

           
          </div>
          <div>
            <DashboardPostList post={user?.posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardList;
