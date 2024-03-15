import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { getTotalOrderValue } from "../utils";

const OrderCard = ({
  products,
  customerName,
  quantity,
  status,
  _id,
  updatedProductStatus,
}) => {
  return (
    <Box
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Center>
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"150px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${products[0]?.product?.image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={150}
            width={200}
            objectFit={"cover"}
            src={products[0]?.product?.image}
            alt="#"
          />
        </Box>
      </Center>
      <Stack pt={10} align={"center"}>
        <Text color={"gray.500"} fontSize={"sm"}>
          Customer name {customerName}
        </Text>
        <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
          Total Order Value ${getTotalOrderValue(products)}
        </Heading>
        <Stack direction={"row"} align={"center"}></Stack>
      </Stack>
      <Flex justifyContent={"space-around"} mt={5}>
        <Button
          onClick={() =>
            updatedProductStatus(
              _id,
              status == "Pending" ? "Success" : "Pending"
            )
          }
          colorScheme={status == "Pending" ? "red" : "green"}
        >
          Status {status}
        </Button>{" "}
        <Link href={`/orders/${_id}`}>
          <Button colorScheme="blue">View Order</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default OrderCard;
