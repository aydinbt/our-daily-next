"use client";
import React, { useEffect, useState } from "react";

import Products from "../../(panel)/product/Products";
import Categories from "../../(panel)/category/Categories";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/productSlice";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const [cat, setCat] = useState("");
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    dispatch(getProducts({ cat, keyword }));
  }, [dispatch, cat, keyword]);
  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      <Categories setKeyword={setKeyword} setCat={setCat} />
      <Products />
    </div>
  );
};

export default HomeLayout;
