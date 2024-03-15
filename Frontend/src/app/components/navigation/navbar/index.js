import React from "react";
import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <Link href={"/"}>
        <Button>Home</Button>
      </Link>
      <Link href={"/dashboard"}>
        <Button>Dashboard</Button>
      </Link>
      <Link href={"/products"}>
        <Button>Products</Button>
      </Link>
      <Link href={"/orders"}>
        <Button>Orders</Button>
      </Link>
    </Flex>
  );
};

export default Navigation;
