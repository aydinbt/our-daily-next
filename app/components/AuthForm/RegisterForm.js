"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Divider,
  InputGroup,
  InputRightElement,
  Button,
  InputLeftElement,
  Menu,
  MenuButton,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const RegisterForm = () => {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required("İsim ve Soyisim gerekli"),
      email: Yup.string()
        .required("E-posta gerekli")
        .email("Geçerli bir e-posta adresi girin"),
      confirmEmail: Yup.string()
        .oneOf([Yup.ref("email"), null], "E-posta uyuşmuyor")
        .required("E-posta gerekli")
        .email("Geçerli bir e-posta adresi girin"),
      password: Yup.string()
        .required("Şifre gerekli")
        .min(6, "Şifre en az 6 karakter olmalı"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor")
        .required("Şifre onayı gerekli"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Geçerli bir telefon numarası girin")
        .required("Telefon numarası gerekli"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        await res.json();
        setLoading(false);
        if (!res.ok) {
          toast({
            position: "top",
            title: "Giriş bilgileriniz hatalı, tekrar deneyin",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          resetForm();
          return;
        } else {
          replace("/login");
          toast({
            position: "bottom-right",
            title: "Kullanıcı Oluşturulmuştur.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        resetForm();
      } catch (error) {
        toast({
          position: "top",
          title: error,
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className=" w-2/3 py-4 p-6 container mx-auto shadow-lg rounded-3xl bg-white mt-6 "
    >
      <div className="flex items-center justify-center mb-3">
        <p className="text-xl font-medium font-mono cursor-pointer">
          🍔 Üye ol! Yemeğini hemen sipariş ver. 🥗
        </p>
      </div>
      <div className="font-semibold">
        <Divider className="mb-3" />
        <form onSubmit={formik.handleSubmit}>
          <motion.div
            variants={item}
            className="grid md:grid-cols-2 gap-4 mb-3"
          >
            <FormControl>
              <FormLabel>İsim & Soyisim</FormLabel>
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <div className="error text-red-500 text-xs mt-2">
                  {formik.errors.name}
                </div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Telefon Numarası</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BsFillTelephoneFill color="gray.300" />
                </InputLeftElement>
                <Input
                  min={10}
                  max={11}
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  placeholder="XXX-XXX-XX-XX"
                />
              </InputGroup>
              {formik.errors.phoneNumber && (
                <div className="error text-red-500 text-xs mt-2">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </FormControl>
          </motion.div>
          <Divider className="mb-3" />
          <motion.div
            variants={item}
            className="grid md:grid-cols-2 gap-4 mb-3"
          >
            <FormControl>
              <FormLabel>E-posta adresi</FormLabel>
              <Input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <div className="error text-red-500 text-xs mt-2">
                  {formik.errors.email}
                </div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>E-posta Adresi Tekrar</FormLabel>
              <Input
                type="email"
                name="confirmEmail"
                value={formik.values.confirmEmail}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmEmail && (
                <div className="error text-red-500 text-xs mt-2">
                  {formik.errors.confirmEmail}
                </div>
              )}
            </FormControl>
          </motion.div>
          <Divider className="mb-3" />
          <motion.div
            variants={item}
            className="grid md:grid-cols-2 gap-4 mb-3"
          >
            <FormControl>
              <FormLabel>Şifre</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={show ? "text" : "password"}
                />

                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.errors.password && (
                <div className="error text-red-500 text-xs mt-2">
                  {formik.errors.password}
                </div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Tekrar Şifre</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  type={show ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.errors.confirmPassword && (
                <div className="error text-red-500 text-xs mt-2">
                  {formik.errors.confirmPassword}
                </div>
              )}
            </FormControl>
          </motion.div>
          <Divider className="mb-3" />
          <motion.div variants={item} className="grid md:grid-cols-2 gap-4">
            {/* <FormControl>
              <FormLabel>Açık Adres</FormLabel>
              <Textarea
                name="adress"
                value={formik.values.adress}
                onChange={formik.handleChange}
                maxBlockSize={20}
              />
              {formik.errors.adress && (
                <div className="error text-red-500 text-xs mt-2">
                  {formik.errors.adress}
                </div>
              )}
            </FormControl> */}
            <Button
              type="submit"
              rightIcon={<FaUserPlus size={20} />}
              isLoading={loading}
              colorScheme="red"
            >
              Kayıt Ol
            </Button>
            <Button
              onClick={() => signIn("google")}
              rightIcon={<FcGoogle size={30} />}
            >
              Google ile Kayıt Ol
            </Button>
          </motion.div>
        </form>
        <motion.div
          variants={item}
          className="mt-6 flex-wrap flex items-center gap-2"
        >
          <p className="text-xl font-medium font-serif cursor-pointer">
            Üyeliğin var mı? -
          </p>
          <Link href="/login">
            <Menu>
              <MenuButton as={Button} variant={"outline"} colorScheme="red">
                Giriş Yap
              </MenuButton>
            </Menu>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
