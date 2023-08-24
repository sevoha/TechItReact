import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as yup from "yup"
import { addProduct } from "../Services/productsService";
import { successMsg } from "../Services/feedbackService";
import { useNavigate } from "react-router-dom";

interface NewProductsProps {
  

}
 
const NewProducts: FunctionComponent<NewProductsProps> = () => {
  let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {name: "", price: 0, category: "", description: "", image: "",quantity: 0 },
        validationSchema: yup.object({
            name: yup.string().required().min(3),
            price: yup.number().required().min(0),
            category: yup.string().required().min(2),
            description: yup.string().required().min(2),
            image: yup.string().required().min(2),
            // quantity: yup.number().required().min(0)
        }),
        onSubmit:(values,  { resetForm }) => {
            addProduct(values)
            .then((res) => {
                // setProductChanged(productChanged);
                successMsg("DONE !!!")
                navigate("/products")
                resetForm()
                formik.setFieldValue("price", "")
            })
            .catch((err) => console.log(err));
        },
    })
    useEffect(() => {
        formik.setFieldValue("price", "");
    }, []);
    return (<>
    <form className="mb-3" onSubmit={formik.handleSubmit}>
        <h1>Add New Product</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Produc Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="name">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Product Category"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="category">Category</label>
          {formik.touched.category && formik.errors.category && (
            <p className="text-danger">{formik.errors.category}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Product description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="description">Description</label>
          {formik.touched.description && formik.errors.description && (
            <p className="text-danger">{formik.errors.description}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Product image path"
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="image">Image</label>
          {formik.touched.image && formik.errors.image && (
            <p className="text-danger">{formik.errors.image}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Novel"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="price">Price</label>
          {formik.touched.price && formik.errors.price && (
            <p className="text-danger">{formik.errors.price}</p>
          )}
        </div>
        {/* <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Product quantity"
            name="quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="quantity">Quantity</label>
          {formik.touched.quantity && formik.errors.quantity && (
            <p className="text-danger">{formik.errors.quantity}</p>
          )}
        </div> */}
        <button
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          className="btn btn-success w-100 mt-3"
        >
          Add
        </button>
      </form>
    </>);
}
 
export default NewProducts;