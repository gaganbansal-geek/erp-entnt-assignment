"use client";
import { Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../components/utils";
import axios from "axios";
import OrderCard from "../components/OrderCard/index";
import Loading from "../components/Loader";

const OrdersPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [orderDataLoading, setOrderDataLoading] = useState(true);
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      let {
        data: { data },
      } = await axios.get(`${BASE_API_URL}/orders`);
      console.log(data);
      setOrdersData(data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setOrderDataLoading(false);
    }
  };
  const updateOrderItem = async (orderId, newStatus) => {
    try {
      await axios.patch(`${BASE_API_URL}/orders/${orderId}`, {
        status: newStatus,
      });
      fetchAllOrders();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div>
      <Heading textAlign={"center"}>Orders Page</Heading>
      {!orderDataLoading ? (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {ordersData.map((el) => (
            <OrderCard
              key={el._id}
              updatedProductStatus={(orderId, newStatus) =>
                updateOrderItem(orderId, newStatus)
              }
              {...el}
            />
          ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default OrdersPage;
