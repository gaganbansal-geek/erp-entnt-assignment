"use client";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { EditProductModal } from "../../EditProductModal";
import axios from "axios";
import { BASE_API_URL, toastAlert } from "../../utils";

export default function ProductCard({
  fetchProductsDataAfterUpdate,
  productDeleteCallBack,
  deleteLoading,
  category,
  image,
  price,
  title,
  stockQuantity,_id,
  ...rest
}) {
  const [openEditProductModal, setOpenEditProductModal] = useState(false);

  return (
    <Center py={12}>
      <EditProductModal
        {...rest}
        category={category}
        price={price}
        image={image}
        title={title}
        _id={_id}
        stockQuantity={stockQuantity}
        fetchProductsDataCallBack={() => fetchProductsDataAfterUpdate()}
        openEditProductModal={openEditProductModal}
        sendOpenEditProductModal={(e) => setOpenEditProductModal(e)}
      />
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
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
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
            height={230}
            width={282}
            objectFit={"cover"}
            src={image}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {category}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              ${price}
            </Text>
            <Text textDecoration={"line-through"} color={"gray.600"}>
              ${(price + Math.floor((price * 40) / 100)).toFixed(2)}
              {/* $199 {price here 40 percent increase of actual price} */}
            </Text>
          </Stack>
          <Text color={"gray.500"} fontSize={"sm"}>
            Stock Quantity {stockQuantity}
          </Text>
        </Stack>
        <Flex justifyContent={"space-around"} mt={5}>
          <Button
            onClick={() => setOpenEditProductModal(true)}
            colorScheme="blue"
          >
            Edit
          </Button>{" "}
          <Button
            isLoading={deleteLoading}
            onClick={() => productDeleteCallBack(_id)}
            colorScheme={"red"}
          >
            Delete
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}


