"use client";
import { getCoupons } from "@/app/redux/couponSlice";
import { Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
const Order_Coupons = () => {
  const router = useRouter();
  const dispath = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  useEffect(() => {
    dispath(getCoupons());
  }, [dispath]);
  return (
    <div className="container mx-auto overflow-hidden">
      <div className="grid md:grid-cols-1">
        <div className="py-12 px-12 shadow-lg rounded-lg">
          <IconButton
            onClick={() => router.back()}
            className="mb-4"
            icon={<IoMdArrowBack size={30} color="red" />}
          />

          <div className="flex flex-row justify-between items-center space-x-6 ">
            <span className="font-bold text-2xl border-b-2">Kuponlar</span>
            <div className="items-center justify-center flex flex-row gap-4">
              <Button
                colorScheme="red"
                rightIcon={<HiOutlineTicket size={25} />}
              >
                Kupon Ekle
              </Button>
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
              {coupon?.coupons?.map((item, i) => {
                return (
                  <tbody key={i}>
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-bold whitespace-nowrap "
                      >
                        {item.code}
                      </th>
                      <td className="px-6 py-4 font-bold">
                        {item.discountPercent}%
                      </td>
                      <div>
                        <td className="px-6 py-4 space-x-6">
                          <IconButton icon={<RiEditFill />} />
                          <IconButton
                            icon={<BiTrash size={25} color="red" />}
                          />
                        </td>
                      </div>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_Coupons;
