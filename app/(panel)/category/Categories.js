"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/categorySlice";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
const Categories = ({ setCat }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.products);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4"
    >
      <div className=" rounded-lg border shadow-md bg-white px-2 py-2 sm:px-6">
        <span className="flex items-center justify-center py-1 mt-2 font-bold border-b-2">
          Kategoriler
        </span>
        <div className="p-2 font-bold whitespace-nowrap">
          <h2
            onClick={() => setCat("")}
            className="flex justify-between flex-1 items-center hover:bg-gray-200 cursor-pointer truncate px-6 bg-gray-100 ease-in-out transition-all rounded-full py-2"
          >
            Tümü
            <span>
              <FaChevronRight color="red" />
            </span>
          </h2>
        </div>
        {category?.category?.map((item) => (
          <div key={item._id} className="p-2 font-bold whitespace-nowrap">
            <h2
              onClick={() => setCat(item._id)}
              className="flex justify-between flex-1 items-center hover:bg-gray-200 cursor-pointer truncate px-6 bg-gray-100 ease-in-out transition-all rounded-full py-2"
            >
              {item.name}
              <span>
                <FaChevronRight color="red" />
              </span>
            </h2>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;
