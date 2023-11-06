"use client";
import { getUser } from "@/app/redux/userSlice";
import { Button, IconButton } from "@chakra-ui/react";
import { Drawer } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
const Users = () => {
  const [open, setOpen] = useState();
  const router = useRouter();
  const dispath = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    dispath(getUser());
  }, [dispath]);
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
    console.log(user);
  };
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
            <span className="font-bold text-2xl border-b-2">Kullanıcılar</span>
            <div className="items-center justify-center flex flex-row gap-4">
              <input
                type="search"
                className=" px-8 bg-slate-100 py-2 rounded-xl border"
                placeholder="Kullanıcı Ara"
              />
            </div>
          </div>
          <div className="relative overflow-x-auto mt-6 shadow-lg ">
            <table className="w-full text-sm text-left ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Kullanıcı ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kullanıcı İsmi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    İşlemler
                  </th>
                </tr>
              </thead>
              {user?.user?.map((item, i) => {
                return (
                  <tbody key={i}>
                    <tr className="bg-white border-b cursor-pointer">
                      <th
                        scope="row"
                        onClick={() => handleUserClick(item)}
                        className="px-6 py-4 font-bold whitespace-nowrap "
                      >
                        {item._id}
                      </th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4 space-x-6">
                        <IconButton icon={<RiEditFill />} />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
      <Drawer
        width={800}
        title={selectedUser?.name}
        onClose={() => setOpen(!open)}
        placement="right"
        open={open}
      >
        <div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  İsim Soyisim
                </dt>
                <dd className="mt-1 text-sm leading-6 font-bold text-gray-700 sm:col-span-2 sm:mt-0">
                  {selectedUser?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 font-bold text-gray-700 sm:col-span-2 sm:mt-0">
                  {selectedUser?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Admin mi?
                </dt>
                <dd className="mt-1 text-sm leading-6 font-bold text-gray-700 sm:col-span-2 sm:mt-0">
                  {selectedUser?.role === "admin" ? "Evet" : "Hayır"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Users;
