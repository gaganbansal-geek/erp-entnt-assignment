"use client";
import React, { useEffect, useState } from "react";
import { BASE_API_URL, getTotalOrderValue } from "../../components/utils";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Loading from "../../components/Loader";

const SingleOrderProductPage = ({ params }) => {
  const { orderid } = params;

  const [orderData, setOrderData] = useState({});
  const [orderLoading, setOrderLoading] = useState(true);

  useEffect(() => {
    getOrderDetails();
  }, [orderid]);

  const getOrderDetails = async () => {
    try {
      let {
        data: { data },
      } = await axios.get(`${BASE_API_URL}/orders/${orderid}`);

      setOrderData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <Center>
      {!orderLoading ? (
        <Box
          role={"group"}
          p={6}
          // maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Stack pt={10} align={"center"}>
            <Text color={"gray.500"} fontSize={"lg"}>
              Customer name {orderData?.customerName}
            </Text>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              Total Order Value ${getTotalOrderValue(orderData?.products)}
            </Heading>
            <Stack direction={"row"} align={"center"}></Stack>
          </Stack>
          <Flex justifyContent={"space-around"} mt={5}>
            <Button
              colorScheme={orderData?.status == "Pending" ? "red" : "green"}
            >
              Status {orderData?.status}
            </Button>{" "}
          </Flex>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={50}
          >
            {orderData?.products?.map((product) => (
              <Box
                maxW={"400px"}
                rounded={"lg"}
                mt={12}
                // pb={10}
                pos={"relative"}
                height={"320px"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${product?.product?.image})`,
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
                  height={300}
                  width={380}
                  mt={30}
                  objectFit={"cover"}
                  src={product?.product?.image}
                  alt="#"
                />
                <Stack pt={10} align={"center"}>
                  <Heading color={"gray.500"} fontSize={"xl"}>
                    Product Price ${product?.product?.price}
                  </Heading>
                  <Text color={"gray.500"} fontWeight={"bold"} fontSize={"md"}>
                    Quantity {product?.quantity}
                  </Text>
                  <Stack direction={"row"} align={"center"}></Stack>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Box>
      ) : (
        <Loading />
      )}
    </Center>
  );
};

export default SingleOrderProductPage;
