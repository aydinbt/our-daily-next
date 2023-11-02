"use client";
// import CardHome from "../cart/CardHome";
import { Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ProductCard from "../../components/GetProducts/Product_Card";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productSlice";
import { useEffect, useState } from "react";
import Categories from "../category/Categories";
import { Skeleton } from "antd";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [cat, setCat] = useState("");
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    dispatch(getProducts({ cat, keyword }));
  }, [dispatch, cat, keyword]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-2"
      >
        <Categories setCat={setCat} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2"
        >
          <div className="rounded-lg p-4">
            <div className="flex right:0">
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    keywordFunc();
                  }
                }}
                placeholder="Basic usage"
              />
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4  p-4"
            >
              {products?.productFilter?.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ProductCard product={item} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Products;
