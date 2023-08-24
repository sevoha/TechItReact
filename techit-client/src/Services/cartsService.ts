import axios from "axios"
import Product from "../Interfaces/product"
import Cart from "../Interfaces/cart"
import _ from "lodash";

let api : string = "http://localhost:7000/api/carts"
//get Cart by userId 
export function getCart() {
  return axios.get(`${api}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}
// create cart
export function createCart(userId: number) {
    return axios.post(`${api}/carts`, {userId, products:[], active: true})
}

// // add to cart / update cart
export function addToCart(productToAdd: Product) {
  let product = _.pick(productToAdd, [
    "_id",
    "name",
    "category",
    "description",
    "price",
    "image",
  ]);
  return axios.post(api, product, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

//     export async function getCart(userId: number) {
//     const res = await axios.get(`${api}/carts/${userId}`);
//     return res.data;

// }


