import React from "react";
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
} from "@chakra-ui/react";

import Link from "next/link";
import { Skeleton } from "antd";

const Loading = () => {
  return (
    <div className="w-2/5 py-4 p-6  container  mx-auto shadow-lg rounded-3xl bg-white mt-6 ">
      <Skeleton active>
        <div className="flex items-center justify-center mb-3">
          <p className="text-xl font-medium font-serif cursor-pointer">
            🍔 Giriş yap, istediğin ürünü sipariş et 🥗
          </p>
        </div>
        <div className="font-semibold">
          <Divider className="mb-3" />
          <form>
            <div className="grid md:grid-cols-1 gap-4 mb-3">
              <FormControl>
                <FormLabel>E-posta adresi</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
            </div>
            <Divider className="mb-3" />
            <div className="grid md:grid-cols-1 gap-4 mb-3">
              <FormControl>
                <FormLabel>Şifre</FormLabel>
                <InputGroup size="md">
                  <Input pr="4.5rem" name="password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm"></Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </div>
            <div className="grid md:grid-cols-2 items-center justify-center gap-12">
              <Button type="submit" colorScheme="red">
                Giriş Yap
              </Button>
              <Button>Google ile Giriş Yap</Button>
            </div>
          </form>
          <div className="mt-6 flex-wrap flex items-center gap-2">
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
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default Loading;
