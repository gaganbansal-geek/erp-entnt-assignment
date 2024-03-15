"use client";
import { Button, Grid, Heading } from "@chakra-ui/react";
import ProductCard from "../components/AddNewProductModal/ProductCard";
import { AddNewProductModal } from "../components/AddNewProductModal";
import { useEffect, useState } from "react";
import { BASE_API_URL, toastAlert } from "../components/utils";
import axios from "axios";
import Loading from "../components/Loader";

const ProductsPage = () => {
  const [openAddNewProductModal, setOpenAddNewProductModal] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    try {
      let {
        data: { data },
      } = await axios.get(`${BASE_API_URL}/products`);
      console.log(data, "data i am the data");
      setProductsData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductsLoading(false);
    }
  };

  const deleteProductFromDataBase = async (_id) => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${BASE_API_URL}/products/${_id}`);
      toastAlert("Product Deleted From DataBase", "success");
      getProductsData();
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <Heading textAlign={"center"}>Products Page</Heading>
      <Button onClick={(e) => setOpenAddNewProductModal(true)}>
        Add New Product
      </Button>
      <AddNewProductModal
        fetchProductsDataCallBack={() => getProductsData()}
        openAddNewProductModal={openAddNewProductModal}
        sendOpenAddNewProductModal={(e) => setOpenAddNewProductModal(e)}
      />
      {!productsLoading ? (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {productsData.map((el) => (
            <ProductCard
              deleteLoading={deleteLoading}
              productDeleteCallBack={(productId) =>
                deleteProductFromDataBase(productId)
              }
              fetchProductsDataAfterUpdate={() => getProductsData()}
              key={el._id}
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

export default ProductsPage;
