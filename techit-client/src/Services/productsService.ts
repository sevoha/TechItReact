import axios from "axios"
import Product from "../Interfaces/product"

let api : string = "http://localhost:7000/api/products"

export function getProducts(){
    return axios.get(api, {
    headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
    })
}

export function getProductById(id: string){
    return axios.get(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  })
}

export function addProduct(newProduct:Product){
    return axios.post(`${api}/products`, newProduct, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  })
}

export function updateProduct(updatedProduct: Product, id: string){
    return axios.put(`${api}/${id}`, updatedProduct , {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  })
}

export function deleteProduct(id:string){
    return axios.delete(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  })
}
