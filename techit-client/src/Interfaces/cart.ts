import Product from "./product";

export default interface Cart {
    _id?: string,
    userId: number,
    products: Product[],
    active: boolean
}