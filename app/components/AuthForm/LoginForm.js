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
  MenuButton,
  Menu,
  useToast,
} from "@chakra-ui/react";
import { LiaSignInAltSolid } from "react-icons/lia";

import * as Yup from "yup";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
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

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("E-posta gerekli")
        .email("Geçerli bir e-posta adresi girin"),
      password: Yup.string().required("Şifre gerekli"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await signIn("credentials", values, { redirect: false });
        setLoading(false);
        if (!res.ok) {
          toast({
            position: "top",
            title: "Giriş bilgileriniz hatalı, tekrar deneyin",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          position: "top",
          title: error,
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
      resetForm();
    },
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-2/5 py-4 p-6  container  mx-auto shadow-lg rounded-3xl bg-white mt-6 "
    >
      <div className="flex items-center justify-center mb-3">
        <p className="text-xl font-medium font-serif cursor-pointer">
          🍔 Giriş yap, istediğin ürünü sipariş et 🥗
        </p>
      </div>
      <div className="font-semibold">
        <Divider className="mb-3" />
        <form onSubmit={formik.handleSubmit}>
          <motion.div
            variants={item}
            className="grid md:grid-cols-1 gap-4 mb-3"
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
          </motion.div>
          <Divider className="mb-3" />
          <motion.div
            variants={item}
            className="grid md:grid-cols-1 gap-4 mb-3"
          >
            <FormControl>
              <FormLabel>Şifre</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="password"
                  type={show ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
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
          </motion.div>
          <motion.div
            variants={item}
            className="grid md:grid-cols-2 items-center justify-center gap-12"
          >
            <Button
              rightIcon={<LiaSignInAltSolid size={25} />}
              isLoading={loading}
              type="submit"
              colorScheme="red"
            >
              Giriş Yap
            </Button>
            <Button
              onClick={() => signIn("google")}
              rightIcon={<FcGoogle size={30} />}
            >
              Google ile Giriş Yap
            </Button>
          </motion.div>
        </form>
        <motion.div
          variants={item}
          className="mt-6 flex-wrap flex items-center gap-2"
        >
          <p className="text-xl font-medium font-serif cursor-pointer">
            Üyeliğin yok mu? -
          </p>
          <Link href="/register">
            <Menu>
              <MenuButton as={Button} variant={"outline"} colorScheme="red">
                Kayıt Ol
              </MenuButton>
            </Menu>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
