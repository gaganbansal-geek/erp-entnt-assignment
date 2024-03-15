import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL, toastAlert } from "../utils";

export const AddNewProductModal = ({
  openAddNewProductModal,
  sendOpenAddNewProductModal,
  fetchProductsDataCallBack,
}) => {
  const [newProductDetails, setNewProductsDetails] = useState({
    category: "",
    title: "",
    image: "",
    stockQuantity: "",
    price: "",
  });

  const saveTheFinalProductDetails = async () => {
    try {
      await axios.post(`${BASE_API_URL}/products`, {
        ...newProductDetails,
      });
      sendOpenAddNewProductModal(false);
      fetchProductsDataCallBack();
      toastAlert("Product added Successs", "success");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <Modal
        isOpen={openAddNewProductModal}
        onClose={() => sendOpenAddNewProductModal(false)}
      >
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>Create New Product </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
               isRequired
                onChange={(e) =>
                  setNewProductsDetails({
                    ...newProductDetails,
                    title: e.target.value,
                  })
                }
                value={newProductDetails?.title}
                placeholder="Enter new product name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category name</FormLabel>
              <Input isRequired
                onChange={(e) =>
                  setNewProductsDetails({
                    ...newProductDetails,
                    category: e.target.value,
                  })
                }
                value={newProductDetails?.category}
                placeholder="Enter new category"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price </FormLabel>
              <Input isRequired
                onChange={(e) =>
                  setNewProductsDetails({
                    ...newProductDetails,
                    price: e.target.value,
                  })
                }
                value={newProductDetails?.price}
                type="number"
                placeholder="Enter new price"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input isRequired
                onChange={(e) =>
                  setNewProductsDetails({
                    ...newProductDetails,
                    image: e.target.value,
                  })
                }
                value={newProductDetails?.image}
                type="url"
                placeholder="Enter new image url"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image Preview</FormLabel>
              <Image
                margin={"auto"}
                mt={5}
                mb={5}
                rounded={"lg"}
                height={230}
                width={282}
                objectFit={"cover"}
                src={newProductDetails?.image}
                alt="Please Add Create Image url"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Stock Quantity </FormLabel>
              <Input isRequired
                onChange={(e) =>
                  setNewProductsDetails({
                    ...newProductDetails,
                    stockQuantity: e.target.value,
                  })
                }
                value={newProductDetails?.stockQuantity}
                type="number"
                placeholder="Enter new stock quantity"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={saveTheFinalProductDetails}
              colorScheme="green"
              mr={3}
            >
              Save
            </Button>
            <Button
              colorScheme="red"
              onClick={() => sendOpenAddNewProductModal(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
