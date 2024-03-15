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
export const EditProductModal = ({
  openEditProductModal,
  sendOpenEditProductModal,
  category,
  price,
  title,
  image,
  stockQuantity,
  _id,
  fetchProductsDataCallBack,
}) => {
  const [editProductDetails, setEditProductsDetails] = useState({
    category,
    title,
    image,
    stockQuantity,
    price,
    _id,
  });

  const saveTheFinalProductDetails = async () => {
    try {
      await axios.patch(`${BASE_API_URL}/products/${_id}`, {
        ...editProductDetails,
      });
      sendOpenEditProductModal(false);
      fetchProductsDataCallBack();
      toastAlert("Data updated to the server. Fire on!", "success");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <Modal
        isOpen={openEditProductModal}
        onClose={() => sendOpenEditProductModal(false)}
      >
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>Edit {editProductDetails?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
                onChange={(e) =>
                  setEditProductsDetails({
                    ...editProductDetails,
                    title: e.target.value,
                  })
                }
                value={editProductDetails?.title}
                placeholder="Enter new product name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category name</FormLabel>
              <Input
                onChange={(e) =>
                  setEditProductsDetails({
                    ...editProductDetails,
                    category: e.target.value,
                  })
                }
                value={editProductDetails?.category}
                placeholder="Enter new category"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price </FormLabel>
              <Input
                onChange={(e) =>
                  setEditProductsDetails({
                    ...editProductDetails,
                    price: e.target.value,
                  })
                }
                value={editProductDetails?.price}
                type="number"
                placeholder="Enter new price"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                onChange={(e) =>
                  setEditProductsDetails({
                    ...editProductDetails,
                    image: e.target.value,
                  })
                }
                value={editProductDetails?.image}
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
                src={editProductDetails?.image}
                alt="Error Showing Image"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Stock Quantity </FormLabel>
              <Input
                onChange={(e) =>
                  setEditProductsDetails({
                    ...editProductDetails,
                    stockQuantity: e.target.value,
                  })
                }
                value={editProductDetails?.stockQuantity}
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
              onClick={() => sendOpenEditProductModal(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
