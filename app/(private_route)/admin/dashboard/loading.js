import { Skeleton } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto mt-2 shadow-md rounded-lg px-4 py-4">
      <Skeleton active>
        <div className="grid md:grid-cols-3 py-4 px-4 mb-4 gap-8">
          <div className=" cursor-pointer flex flex-col items-center justify-center hover:bg-slate-100 hover:transition-all ease-in-out shadow-lg rounded-lg ">
            <span className="font-bold text-xl  border-b border-red-400 mt-2"></span>
            <span className="font-bold mt-6"></span>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default Loading;
