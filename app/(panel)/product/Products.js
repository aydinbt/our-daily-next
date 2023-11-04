"use client";
import { motion } from "framer-motion";
import ProductCard from "../../components/GetProducts/Product_Card";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productSlice";
import { useEffect } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2  gap-2   mt-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 shadow-md rounded-3xl bg-gray-50"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4   p-4 mt-6"
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
        </motion.div>
      </motion.div>
    </>
  );
};

export default Products;
