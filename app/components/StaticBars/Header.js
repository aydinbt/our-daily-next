"use client";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

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
} from "@chakra-ui/react";
import { GrHistory, GrCircleInformation } from "react-icons/gr";
import { HiLocationMarker, HiOutlineLogout } from "react-icons/hi";
import {
  BiMessageEdit,
  BiSolidMoon,
  BiWorld,
  BiLogIn,
  BiSolidUserPlus,
  BiSolidUserAccount,
} from "react-icons/bi";
import { TbBasketHeart } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { MdAccountCircle } from "react-icons/md";
import { Badge, Drawer, Radio, Space } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  calculateTotal,
  removeSingleCart,
} from "../../redux/cartSlice";
import { motion } from "framer-motion";
import { AiOutlineMinus } from "react-icons/ai";

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
      <div className="bg-slate-100 shadow-2xl rounded-sm p-6">
        <div className="container mx-auto py-2 flex flex-row justify-between items-center">
          <Link href="/">
            <span className="text-3xl">LOGO</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="grid md:grid-cols-1">
              <Link href="/">
                <Button colorScheme="red" variant="ghost">
                  Anasayfa
                </Button>
              </Link>
            </div>
            {session?.user ? (
              <>
                <Menu>
                  <MenuButton
                    rightIcon={<BiSolidUserAccount size={20} />}
                    as={Button}
                    colorScheme="red"
                  >
                    Hesabım
                  </MenuButton>
                  <MenuList className="shadow-2xl">
                    <MenuGroup title="Ayarlar">
                      <Link href="/auth/profile">
                        <MenuItem icon={<MdAccountCircle size={20} />}>
                          Hesap Bilgileri
                        </MenuItem>
                      </Link>
                      <Link href="/order-tracking/all">
                        <MenuItem icon={<GrHistory size={20} />}>
                          Siparişlerim
                        </MenuItem>
                      </Link>
                      <MenuItem icon={<HiLocationMarker size={20} />}>
                        Adreslerim
                      </MenuItem>
                      <MenuItem icon={<BiSolidMoon size={20} />}>
                        Karanlık Mod
                      </MenuItem>
                    </MenuGroup>
                    <MenuGroup title="Yardım">
                      <MenuItem icon={<GrCircleInformation size={20} />}>
                        Bize Ulaş
                      </MenuItem>
                      <MenuItem icon={<BiMessageEdit size={20} />}>
                        Görüşlerini Bildir
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />

                    <MenuGroup>
                      <MenuItem
                        onClick={() => signOut()}
                        icon={<HiOutlineLogout size={20} />}
                      >
                        Çıkış Yap
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Menu>
                <MenuButton as={Button} colorScheme="red">
                  <VscAccount size={25} />
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Üyelik İşlemleri">
                    <Link href="/register">
                      <MenuItem
                        className="font-semibold"
                        icon={<BiSolidUserPlus size={22} color="red" />}
                      >
                        Üyelik Oluştur
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link href="/login">
                      <MenuItem
                        className="font-semibold"
                        icon={<BiLogIn size={22} color="red" />}
                      >
                        Giriş Yap
                      </MenuItem>
                    </Link>
                  </MenuGroup>
                  <MenuDivider />
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
            )}
            <>
              <Badge count={cartItems ? cartItems.length : 0} className="mr-1">
                <IconButton
                  colorScheme="red"
                  onClick={showDrawer}
                  icon={<TbBasketHeart size={25} />}
                />
              </Badge>
              <Menu>
                <MenuButton as={Button} colorScheme="red">
                  <div className="flex flex-row items-center gap-2">
                    <p className="font-bold">🇹🇷 / 🇬🇧</p>
                    <BiWorld size={20} />
                  </div>
                </MenuButton>
              </Menu>
            </>
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
              <div className="space-y-3 rounded-lg border shadow-md bg-white px-2 py-4 sm:px-6">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-xl font-medium">Sepetim</p>
                </div>
                {cartItems.length > 0 ? (
                  cartItems?.map((state, i) => (
                    <div key={i}>
                      <motion.div className="flex flex-col rounded-lg bg-white sm:flex-row">
                        <div className="flex w-full flex-col px-2 py-2">
                          <span className="font-semibold text-sm">
                            {state.name}
                          </span>
                          <span className="float-right text-sm text-gray-400">
                            {state.description}
                          </span>

                          <div className="flex justify-between items-center">
                            <p className="text-sm font-bold">
                              ₺{state.price.current.toFixed(2)}
                            </p>
                            <div className="flex flex-row items-center gap-2">
                              <IconButton
                                onClick={() =>
                                  handleRemoveSingleFromCart(state)
                                }
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
                      ₺{total ? total : 0}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">İndirim</p>
                    <p className="font-semibold line-through text-gray-900">
                      ₺{total ? total : 0}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Toplam Tutar
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ₺{total ? total : 0}
                  </p>
                </div>
                <Divider />
              </div>
            </motion.div>
          </Drawer>
        </>
      </div>
    </nav>
  );
};

export default Header;
