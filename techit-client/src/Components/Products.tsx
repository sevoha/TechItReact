import { FunctionComponent, useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../Services/productsService";
import Product from "../Interfaces/product";
import { Link } from "react-router-dom";
import { successMsg } from "../Services/feedbackService";
import { addToCart } from "../Services/cartsService";

interface ProductsProps {
    userInfo: any;
}
const Products: FunctionComponent<ProductsProps> = ({userInfo}) => {
    let [products, setProducts] = useState<Product[]>([]);
    let [productsChanged, setProductsChanged] = useState<boolean>(false);
    useEffect(() => {
        getProducts()
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err))
    }, [productsChanged])
    let render = () => {
    setProductsChanged(!productsChanged);
    };
    let handleDelete = (id:string) => {
        if(window.confirm("Are You Sure ?")) {
            deleteProduct(id)
            .then((res) => {
                render()
                successMsg( "Product Deleted" )
            })
            .catch((err) => console.log(err))
        }
    }
    let handleAddToCart = (product: Product) => {
    addToCart(product)
        .then((res) => successMsg("Product added to cart!"))
        .catch((err) => console.log(err));
    };
    return (<>
    <h1>Products</h1>
    {userInfo.isAdmin &&(
        <Link to="/newProduct" className="btn btn-success mt-3">
            <i className="fa-solid fa-plus"></i> Add Product
        </Link>)}
    {products.length ? (
        <div className="container mt-5">
        <div className="row">
        {products.map((product: Product) => (
        <div key={product._id}
            className="card col-md-6 mb-3 mx-2"
            style={{ width: "18rem" }}>
        <img 
            src={product.image}
            className="card-img-top"
            alt={product.name}/>
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text text-success">{product.price} ₪</p>
            <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            {userInfo.isAdmin && (
            <>
                <Link to={`/updateProduct/${product._id}`} className="btn btn-warning mx-1">
                    <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <Link to="" className="btn btn-danger" onClick={()=> handleDelete(product._id as string)}>
                    <i className="fa-solid fa-trash"></i>
                </Link>
            </>
            )}
        </div>
        </div>
            ))}
        </div>
        </div>
    ) : (
        <p>No products</p>
    )}
    </>);
}
 
export default Products;