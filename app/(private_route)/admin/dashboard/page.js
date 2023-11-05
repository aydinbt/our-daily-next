"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { BiDuplicate } from "react-icons/bi";

const Dashboard = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const handleCategoryClick = (item) => {
    setSelectedCategoryId(item.id);
  };

  //   if (session.user.role !== "admin") redirect("/");
  const adminMenu = [
    {
      id: 1,
      name: "Siparişler",
      path: "/admin/dashboard/order_tracking",
    },
    {
      id: 2,
      name: "Ürünler",
      path: "/admin/dashboard/order_products",
    },
    {
      id: 3,
      name: "Kategoriler",
      path: "/admin/dashboard/order_categories",
    },
    {
      id: 4,
      name: "Kuponlar",
      path: "/admin/dashboard/order_coupons",
    },
    {
      id: 5,
      name: "Kullanıcılar",
      path: "/admin/dashboard/users",
    },
  ];
  return (
    <div className="container mx-auto mt-2">
      <div className="flex flex-row items-center gap-4 py-4 ">
        {adminMenu.map((item) => {
          return (
            <Link href={item.path}>
              <span
                key={item.id}
                onClick={() => handleCategoryClick(item)}
                className={`cursor-pointer font-bold ${
                  item.id === selectedCategoryId
                    ? "border-b-2 border-red-600 transition-all ease-in-out"
                    : ""
                } gap-2 p-2`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
