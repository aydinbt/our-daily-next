"use client";
import { getCategory } from "@/app/redux/categorySlice";
import { getProducts } from "@/app/redux/productSlice";
import { getUser } from "@/app/redux/userSlice";
import { motion } from "framer-motion";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispath = useDispatch();
  const user = useSelector((state) => state.user.products);
  const { products } = useSelector((state) => state.products);
  const category = useSelector((state) => state.category.products);

  useEffect(() => {
    dispath(getUser());
    dispath(getProducts());
    dispath(getCategory());
  }, [dispath]);
  //   if (session.user.role !== "admin") redirect("/");
  const adminMenu = [
    {
      id: 1,
      name: "Siparişler 🔥",
      path: "/admin/dashboard/order_tracking",
      stat: "",
    },
    {
      id: 2,
      name: "Ürünler 🚀",
      path: "/admin/dashboard/order_products",
      stat: products?.productFilter?.length,
    },
    {
      id: 3,
      name: "Kategoriler 😍",
      path: "/admin/dashboard/order_categories",
      stat: category?.category?.length,
    },
    {
      id: 4,
      name: "Kuponlar 👑",
      path: "/admin/dashboard/order_coupons",
      stat: "",
    },
    {
      id: 5,
      name: "Kullanıcılar 🫶",
      path: "/admin/dashboard/users",
      stat: user?.user?.length,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto mt-2 shadow-md rounded-lg px-4 py-4"
    >
      <div className="grid md:grid-cols-3 py-4 px-4 mb-4 gap-8">
        {adminMenu.map((item, i) => {
          return (
            <Link href={item.path}>
              <div
                key={i}
                className=" cursor-pointer flex flex-col items-center justify-center hover:bg-slate-100 hover:transition-all ease-in-out shadow-lg rounded-lg "
              >
                <span className="font-bold text-xl  border-b border-red-400 mt-2">
                  {item.name}
                </span>
                <span className="font-bold mt-6">{item.stat}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Dashboard;
