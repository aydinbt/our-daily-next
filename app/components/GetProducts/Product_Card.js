"use client";
import { Button, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { Modal, Divider, InputNumber } from "antd";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductCard = ({ product }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setQuantity(1);
  };
  return (
    <>
      <div
        key={product._id}
        onClick={() => setModal2Open(true)}
        className="py-4 px-8 bg-white shadow-lg rounded-lg mt-14 cursor-pointer  hover:bg-slate-100  hover:translate-y-1 transition duration-150 ease-in-out"
      >
        <div className="flex justify-center md:justify-end -mt-16">
          <img
            className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
            src={product.img}
          />
        </div>
        <div>
          <h2 className="text-gray-800  font-semibold">{product?.name}</h2>
          <p className="mt-2 text-gray-600">
            {product?.description ? product.description : "."}
          </p>
        </div>
        <div className="flex mt-2 flex-row justify-between items-center">
          <span className="font-bold">
            {product?.price?.current.toFixed(2)}₺
          </span>
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="red"
            aria-label="Done"
            fontSize="20px"
            icon={<BsFillPatchCheckFill />}
          />
        </div>
      </div>
      <Modal
        centered
        footer={[
          <div
            key={product._id}
            className="flex flex-row justify-between items-center py-4 px-4 shadow-lg rounded-md border"
          >
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              value={quantity}
              onChange={setQuantity}
            />
            <Button
              key="submit"
              colorScheme="red"
              type="submit"
              onClick={() => handleAddToCart()}
            >
              Sepete Ekle <TbSend className="ml-2" size={25} />
            </Button>
          </div>,
        ]}
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
      >
        <div className="mt-8 ">
          <div className="flex">
            <img
              className="mb-6  shadow-lg rounded-md flex-1 "
              src={product.img}
            />
          </div>
          <div className="bg-slate-100 shadow-lg rounded-md p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="font-bold">{product?.name}</p>
              <p className="font-bold">{product?.price?.current.toFixed(2)}₺</p>
            </div>
            <p>{product?.description}</p>
            <Divider />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
