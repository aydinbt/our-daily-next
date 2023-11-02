import { Skeleton } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="px-4">
      <div className=" rounded-lg border shadow-md bg-white px-2 py-2 sm:px-6">
        <Skeleton active>
          <span className="flex items-center justify-center py-1 mt-2 font-bold border-b-2">
            Kategoriler
          </span>
          <div className="p-2 font-bold whitespace-nowrap">
            <h2 className="flex justify-between flex-1 items-center hover:bg-gray-200 cursor-pointer truncate px-6 bg-gray-100 ease-in-out transition-all rounded-full py-2"></h2>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Loading;
