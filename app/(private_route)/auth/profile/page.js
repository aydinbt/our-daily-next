import React from "react";

import { getServerSession } from "next-auth";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
} from "@chakra-ui/react";
import { Modal } from "antd";

import { BsFillTelephoneFill } from "react-icons/bs";
import { PiTrash } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { GrUpdate } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session) {
    return (
      <div className="container  mt-6 mx-auto ">
        <div className="w-3/5 py-6  p-6 container mx-auto justify-center shadow-md rounded-xl">
          <div className="flex flex-col justify-center items-center mb-6">
            <Avatar name={session?.user?.name} />
            <h3 className="mt-3 font-bold">
              Hoşgeldin, {session?.user?.name}
              <span className="text-3xl">😊</span>
            </h3>
          </div>
          <Accordion defaultIndex={[0]}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="uppercase"
                  >
                    Hesabım
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="gap-4 flex flex-col">
                <Input placeholder={session?.user?.name} />
                <Input placeholder={session?.user?.email} />
                <Input placeholder={session?.user?.phoneNumber} />
                <Divider />
                <h6>Şifre Güncelle</h6>
                <Input placeholder="Mevcut Şifre" />
                <Input placeholder="Yeni Şifre" />
                <div className="flex items-center justify-end">
                  <Button rightIcon={<GrUpdate size={20} />} colorscheme="red">
                    Bilgilerimi Güncelle
                  </Button>
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="uppercase"
                  >
                    Adreslerim
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className="flex items-center justify-end ">
                  <Button colorscheme="red">
                    Yeni Adres Ekle <HiLocationMarker size={20} color="red" />
                  </Button>
                </div>
                <div className="flex flex-col  ">
                  {session?.user?.adress?.map((dt, i) => {
                    return (
                      <div
                        key={i}
                        className="cursor-pointer border hover:bg-slate-200 transition-all py-4 px-4  mt-4 ease-in shadow-md  rounded-lg flex flex-row items-center justify-between"
                      >
                        <span>
                          <HiLocationMarker size={20} color="red" />
                        </span>
                        <h2 colorscheme="red flex flex-row">{dt.adressAll}</h2>
                        <div className="flex flex-row gap-4 items-center justify-center ml-2">
                          <IconButton
                            color="red"
                            bgColor="blackAlpha.200"
                            onClick={() => setModal2Open(true)}
                            icon={<AiOutlineEdit size={20} />}
                          />
                          <Popover>
                            <PopoverTrigger>
                              <IconButton
                                color="red"
                                bgColor="blackAlpha.200"
                                colorscheme="twitter"
                                icon={<PiTrash size={20} />}
                              />
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody className="mt-4">
                                Adresini silmek istediğinden emin misin?
                              </PopoverBody>
                              <PopoverFooter
                                display="flex"
                                justifyContent="flex-end"
                              >
                                <ButtonGroup size="sm">
                                  <Button variant="outline">Kapat</Button>
                                  <Button colorscheme="red">Evet</Button>
                                </ButtonGroup>
                              </PopoverFooter>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
        {/* <Modal
          title="Adresini güncelle"
          centered
          open={modal2Open}
          onCancel={() => setModal2Open(false)}
        >
          <div>
            <Textarea maxBlockSize={20} />
          </div>
        </Modal> */}
      </div>
    );
  }
  return null;
};

export default Profile;
