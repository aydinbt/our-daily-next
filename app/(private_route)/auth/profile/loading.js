import React from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
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
} from "@chakra-ui/react";
import { Skeleton } from "antd";

const Loading = () => {
  return (
    <div className="container  mt-6 mx-auto ">
      <div className="w-3/5 py-6  p-6 container mx-auto justify-center shadow-md rounded-xl">
        <Skeleton active>
          <div className="flex flex-col justify-center items-center mb-6">
            <Avatar />
            <h3 className="mt-3 font-bold">
              Hoşgeldin,
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
                <Input placeholder="" />
                <Input placeholder="" />
                <Input placeholder="" />
                <Divider />
                <h6>Şifre Güncelle</h6>
                <Input placeholder="Mevcut Şifre" />
                <Input placeholder="Yeni Şifre" />
                <div className="flex items-center justify-end">
                  <Button colorscheme="red">Bilgilerimi Güncelle</Button>
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
                  <Button colorscheme="red">Yeni Adres Ekle</Button>
                </div>
                <div className="flex flex-col  ">
                  <div className="cursor-pointer border hover:bg-slate-200 transition-all py-4 px-4  mt-4 ease-in shadow-md  rounded-lg flex flex-row items-center justify-between">
                    <h2 colorscheme="red flex flex-row"></h2>
                    <div className="flex flex-row gap-4 items-center justify-center ml-2">
                      <IconButton color="red" bgColor="blackAlpha.200" />
                      <Popover>
                        <PopoverTrigger>
                          <IconButton
                            color="red"
                            bgColor="blackAlpha.200"
                            colorscheme="twitter"
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
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Skeleton>
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
};

export default Loading;
