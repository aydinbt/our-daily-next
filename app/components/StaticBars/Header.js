"use client";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuGroup,
  MenuDivider,
  Divider,
  IconButton,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Image,
} from "@chakra-ui/react";
import { GrHistory, GrCircleInformation } from "react-icons/gr";
import { HiLocationMarker, HiOutlineLogout } from "react-icons/hi";
import {
  BiMessageEdit,
  BiMessageSquareDetail,
  BiSolidDashboard,
  BiSolidMoon,
  BiSolidTimer,
} from "react-icons/bi";
import { TbBasketHeart } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import { Badge, Drawer, Space } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  calculateTotal,
  removeSingleCart,
} from "../../redux/cartSlice";
import { motion } from "framer-motion";
import { AiOutlineMinus } from "react-icons/ai";
import { BsChevronDown, BsPersonFillAdd } from "react-icons/bs";

const Header = () => {
  const { status, data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleRemoveSingleFromCart = (item) => {
    dispatch(calculateTotal());
    dispatch(removeSingleCart(item));
  };
  const handleAddToCart = (item) => {
    dispatch(calculateTotal());
    dispatch(addToCart(item));
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <nav className="sticky top-0 z-10 ">
      <div className="container mx-auto px-4 py-4 rounded-xl shadow-lg bg-white">
        <div className="grid md:grid-cols-1 overflow-hidden ">
          <div className="flex flex-wrap items-center gap-4 justify-center mt-6 ">
            <span>
              <Link href="/">
                <Image
                  className="w-[160px] h-[40px]"
                  src="https://yemek10.com/Images/kucukev/WebGorseller/190x40express.png"
                />
              </Link>
            </span>

            {session?.user ? (
              <>
                <div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<BsChevronDown size={25} color="red" />}
                    >
                      <span className="font-bold text-xl">
                        Hoşgeldin, {session.user.name}
                      </span>
                    </MenuButton>
                    <MenuList className="shadow-2xl">
                      <MenuGroup title="Ayarlar">
                        <Link href="/auth/profile">
                          <MenuItem icon={<MdAccountCircle size={20} />}>
                            Hesap Bilgileri
                          </MenuItem>
                        </Link>
                        {session?.user?.role === "admin" ? (
                          <Link href="/admin/dashboard">
                            <MenuItem
                              icon={<BiSolidDashboard size={20} color="red" />}
                            >
                              Dashboard
                            </MenuItem>
                          </Link>
                        ) : (
                          ""
                        )}

                        <Link href="/order-tracking/all">
                          <MenuItem icon={<GrHistory size={20} />}>
                            Siparişlerim
                          </MenuItem>
                        </Link>
                        <MenuItem icon={<HiLocationMarker size={20} />}>
                          Adreslerim
                        </MenuItem>
                      </MenuGroup>
                      <MenuGroup title="Yardım">
                        <MenuItem icon={<GrCircleInformation size={20} />}>
                          Bize Ulaş
                        </MenuItem>
                        <MenuItem icon={<BiMessageEdit size={20} />}>
                          Görüşlerini Bildir
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          onClick={() => signOut()}
                          icon={<HiOutlineLogout size={20} />}
                        >
                          Çıkış Yap
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<BsChevronDown size={25} color="red" />}
                    >
                      Üyelik işlemleri
                    </MenuButton>
                    <MenuList className="shadow-2xl">
                      <MenuGroup title="Ayarlar">
                        <Link href="/login">
                          <MenuItem icon={<IoMdLogIn size={25} />}>
                            Giriş Yap
                          </MenuItem>
                        </Link>
                        <Link href="register">
                          <MenuItem icon={<BsPersonFillAdd size={25} />}>
                            Kayıt Ol
                          </MenuItem>
                        </Link>
                      </MenuGroup>
                      <MenuGroup title="Yardım">
                        <MenuItem icon={<GrCircleInformation size={20} />}>
                          Bize Ulaş
                        </MenuItem>
                        <MenuItem icon={<BiMessageEdit size={20} />}>
                          Görüşlerini Bildir
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            )}

            <>
              <Badge count={cartItems ? cartItems.length : 0} className="mr-1">
                <IconButton
                  colorScheme="red"
                  onClick={showDrawer}
                  icon={<TbBasketHeart size={25} />}
                />
              </Badge>
              <IconButton icon={<BiSolidMoon size={20} />} />
            </>
          </div>
        </div>
      </div>
      <>
        <Drawer
          placement={placement}
          width={700}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              {status === "authenticated" ? (
                <Link href="">
                  <Button
                    colorScheme="red"
                    isDisabled={cartItems.length === 0 ? true : false}
                    rightIcon={<FaChevronRight />}
                    type="primary"
                  >
                    Siparişi Tamamla
                  </Button>
                </Link>
              ) : (
                <Link href="">
                  <Button
                    rightIcon={<FaChevronRight />}
                    isDisabled={cartItems.length === 0 ? true : false}
                    colorScheme="red"
                    type="primary"
                  >
                    Siparişi Tamamla
                  </Button>
                </Link>
              )}
            </Space>
          }
        >
          <motion.div initial="hidden" animate="visible" className="px-4">
            <div className="space-y-3 rounded-lg  shadow-md bg-white px-2 py-4 sm:px-6">
              {cartItems.length > 0 ? (
                cartItems?.map((state, i) => (
                  <div key={i}>
                    <motion.div className="flex flex-col rounded-lg bg-white sm:flex-row">
                      <div className="flex w-full flex-col px-2 py-2">
                        <span className="font-semibold text-sm">
                          {state.name}
                        </span>
                        {state?.option.map((opt, i) => {
                          return (
                            <span className="float-right text-sm text-gray-400">
                              {opt}
                            </span>
                          );
                        })}

                        <div className="flex justify-between items-center">
                          <p className="text-sm font-bold">
                            ₺{state.price.current.toFixed(2)}
                          </p>
                          <div className="flex flex-row items-center gap-2">
                            <IconButton
                              onClick={() => handleRemoveSingleFromCart(state)}
                              icon={<AiOutlineMinus color="red" />}
                            />
                            <NumberInput
                              size="sm"
                              maxW={16}
                              max={10}
                              value={state.quantity}
                              min={1}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper
                                  onClick={() => handleAddToCart(state)}
                                />
                              </NumberInputStepper>
                            </NumberInput>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <Divider />
                  </div>
                ))
              ) : (
                <div className="mt-2">
                  <span className="font-mono">
                    Sepette Ürün bulunmamaktadır.
                  </span>
                </div>
              )}
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Ara Toplam
                  </p>
                  <p className="font-semibold text-gray-900">
                    ₺{total ? total.toFixed(2) : 0}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">İndirim</p>
                  <p className="font-semibold line-through text-gray-900">
                    ₺{total ? total.toFixed(2) : 0}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Toplam Tutar
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₺{total ? total.toFixed(2) : 0}
                </p>
              </div>
              <Divider />
            </div>
          </motion.div>
        </Drawer>
      </>
    </nav>
  );
};

export default Header;
