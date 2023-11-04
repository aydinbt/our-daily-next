"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/categorySlice";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { BiDuplicate } from "react-icons/bi";
const Categories = ({ setCat, setKeyword }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.products);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCat(categoryId);
  };
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div className="relative">
      <div className="sticky top-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-1 bg-white "
        >
          <div className="shadow-md rounded-xl px-8 py-4 ">
            <div className="flex justify-between items-center mt-4 gap-4 ">
              <span className="font-bold font-mono text-xl border-b-2">
                Kategoriler
              </span>
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="search"
                className="w-96 px-8 bg-slate-100 py-4 rounded-xl"
                placeholder="Yemek Ara"
              />
              <span className="cursor-pointer font-bold font-mono text-xl border-r-2 px-2 border-b-2">
                Tümünü Göster
              </span>
            </div>
            <div className="flex flex-row items-center gap-4 py-4 ">
              <span
                onClick={() => handleCategoryClick("")}
                className="font-bold cursor-pointer font-mono border-b-2 border-red-600 flex flex-row gap-2 p-2"
              >
                <BiDuplicate size={25} />
                Tümü
              </span>
              {category?.category?.map((item) => (
                <div
                  key={item._id}
                  className="p-2 font-bold whitespace-nowrap "
                >
                  <span
                    onClick={() =>
                      handleCategoryClick(item._id ? item._id : "")
                    }
                    className={`cursor-pointer font-bold ${
                      item._id === selectedCategoryId
                        ? "border-b-2 border-red-600 transition-all ease-in-out"
                        : ""
                    } gap-2 p-2`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
