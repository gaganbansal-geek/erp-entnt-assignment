"use client";
import { Box, Center, Grid, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loader/index"
import { BASE_API_URL } from "../components/utils";

const Dashboard = () => {
  const [productsData, setProductsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrders();
    getProductsData();
  }, []);

  const fetchAllOrders = async () => {
    try {
      let {
        data: { data },
      } = await axios.get(`${BASE_API_URL}/orders`);

      setOrdersData(data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsData = async () => {
    try {
      let {
        data: { data },
      } = await axios.get(`${BASE_API_URL}/products`);
      setProductsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Heading textAlign={"center"}>Dashboard</Heading>
      {!loading ? (
        <Grid>
          <Box>
            <Text>Total Products {productsData?.length}</Text>
          </Box>
          <Box>
            <Text>Total Orders {ordersData?.length}</Text>
          </Box>
          <Box></Box>
        </Grid>
      ) : (
       <Loading/>
      )}
    </div>
  );
};

export default Dashboard;
