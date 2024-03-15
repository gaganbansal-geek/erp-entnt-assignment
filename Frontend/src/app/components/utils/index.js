import { toast } from "react-toastify";

export const BASE_API_URL = `https://vast-puce-caterpillar-fez.cyclic.app/api`;

export const toastAlert = (message, type) => {
  toast[`${type}`](message, {
    theme: "colored",
  });
};
export const getTotalOrderValue = (products) => {
  try {
    let finalPrice = 0;
    for (let el of products) {
      finalPrice = finalPrice + el.product.price * el.quantity;
    }
    return Math.ceil(finalPrice);
  } catch (error) {
    console.log("error: ", error);
  }
};
