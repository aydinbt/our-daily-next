"use client";
import { getCategory } from "@/app/redux/categorySlice";
import { getCoupons } from "@/app/redux/couponSlice";
import { getProducts } from "@/app/redux/productSlice";
import { getUser } from "@/app/redux/userSlice";
import { motion } from "framer-motion";
import Link from "next/link";

import React, { useEffect } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import {
  BsFillTicketPerforatedFill,
  BsFire,
  BsRocketTakeoffFill,
} from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const HomeDash = () => {
  const dispath = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.category);
  const { coupon } = useSelector((state) => state.coupon);
  useEffect(() => {
    dispath(getUser());
    dispath(getProducts());
    dispath(getCategory());
    dispath(getCoupons());
  }, [dispath]);

  const adminMenu = [
    {
      id: 1,
      name: "Siparişler",
      path: "/admin/dashboard/order_tracking",
      stat: 0,
      icon: <BsFire size={20} color="red" />,
    },
    {
      id: 2,
      name: "Ürünler",
      path: "/admin/dashboard/order_products",
      stat: products?.productFilter?.length,
      icon: <BsRocketTakeoffFill size={20} color="red" />,
    },
    {
      id: 3,
      name: "Kategoriler",
      path: "/admin/dashboard/order_categories",
      stat: category?.category?.length,
      icon: <BiCategoryAlt size={20} color="red" />,
    },
    {
      id: 4,
      name: "Kuponlar",
      path: "/admin/dashboard/order_coupons",
      stat: coupon?.coupons?.length,
      icon: <BsFillTicketPerforatedFill size={20} color="red" />,
    },
    {
      id: 5,
      name: "Kullanıcılar",
      path: "/admin/dashboard/users",
      stat: user?.user?.length,
      icon: <FaUsers size={20} color="red" />,
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
                <div className="flex flex-row items-center gap-2">
                  <span className="font-bold text-xl  border-b border-red-400 mt-2">
                    {item.name}
                  </span>
                  <span>{item.icon}</span>
                </div>
                <span className="font-bold mt-6">{item.stat}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HomeDash;
