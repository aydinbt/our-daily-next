"use client";
import { getCategory } from "@/app/redux/categorySlice";
import { Button, IconButton, Input, useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiCategoryAlt, BiTrash } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Order_Categories = () => {
  const router = useRouter();
  const toast = useToast();
  const dispath = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [newCategoryUpdate, setCategoryUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { category } = useSelector((state) => state.category);
  useEffect(() => {
    dispath(getCategory());
  }, [dispath]);
  const deleteCategoryClick = async (categoryId) => {
    setSelectedCategories(categoryId);
    const res = await fetch(`/api/categories?id=${categoryId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast({
        position: "top-right",
        title: "Kategori başarıyla silindi",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.reload();
    }
  };
  const updateCategoryClick = async (category) => {
    setIsModalOpen(true);
    setCategoryUpdate(category);
    const res = await fetch(`/api/categories?id=${category._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast({
        position: "top-right",
        title: "Kategori başarıyla silindi",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.reload();
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Kategori ismi gerekli"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await axios.post("/api/categories", values);
        console.log(res);
        setLoading(false);
        if (res.status === 201) {
          toast({
            position: "top",
            title: "Kategori başarıyla eklendi",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          window.location.reload();
          setIsModalOpen(false); // Modal penceresini kapat
        } else {
          toast({
            position: "top",
            title: "Kategori eklerken bir hata oluştu",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          position: "top",
          title: "Bir hata oluştu",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      resetForm();
    },
  });
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
            <span className="font-bold text-2xl border-b-2">Kategoriler</span>
            <div className="items-center justify-center flex flex-row gap-4">
              <Button
                onClick={() => setIsModalOpen(!isModalOpen)}
                colorScheme="red"
                rightIcon={<BiCategoryAlt size={25} />}
              >
                Kategori Ekle
              </Button>
              <input
                type="search"
                className=" px-8 bg-slate-100 py-2 rounded-xl border"
                placeholder="Kategori Ara"
              />
            </div>
          </div>
          <div className="relative overflow-x-auto mt-6 shadow-lg ">
            <table className="w-full text-sm text-left ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Kategori İsmi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    İşlemler
                  </th>
                </tr>
              </thead>
              {category?.category?.map((item, i) => {
                return (
                  <tbody key={i}>
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-bold whitespace-nowrap "
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4 space-x-6">
                        <IconButton
                          onClick={() => updateCategoryClick(item)}
                          icon={<RiEditFill />}
                        />
                        <IconButton
                          onClick={() => deleteCategoryClick(item._id)}
                          icon={<BiTrash size={25} color="red" />}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
      <Modal
        title="Kategori Ekle"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        footer={[]}
      >
        <form onSubmit={formik.handleSubmit}>
          <Input
            className="mt-3"
            type="text"
            placeholder={
              newCategoryUpdate ? newCategoryUpdate.name : "Kategori Ekle"
            }
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <div className="error text-red-500 text-xs mt-2">
              {formik.errors.name}
            </div>
          )}
          <div className="mt-3 flex items-center justify-end">
            <Button isLoading={loading} colorScheme="red" type="submit">
              Kategoriyi Ekle
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Order_Categories;
