import { Skeleton } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto mt-2 shadow-md rounded-lg px-4 py-4">
      <Skeleton active>
        <div className="container mx-auto overflow-hidden">
          <div className="grid md:grid-cols-1">
            <div className="py-12 px-12 shadow-lg rounded-lg">
              <div className="flex flex-row justify-between items-center space-x-6 ">
                <span className="font-bold text-2xl border-b-2">Kuponlar</span>
                <div className="items-center justify-center flex flex-row gap-4">
                  <input
                    type="search"
                    className=" px-8 bg-slate-100 py-2 rounded-xl border"
                    placeholder="Kupon Ara"
                  />
                </div>
              </div>
              <div className="relative overflow-x-auto mt-6 shadow-lg ">
                <table className="w-full text-sm text-left ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Kupon İsmi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        İndirim Oranı
                      </th>

                      <th scope="col" className="px-6 py-3">
                        İşlemler
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-bold whitespace-nowrap "
                      ></th>
                      <td className="px-6 py-4 font-bold"></td>
                      <div>
                        <td className="px-6 py-4 space-x-6"></td>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default Loading;
