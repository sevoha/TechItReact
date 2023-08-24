import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"
import { addUser, getTokenDetails } from "../Services/usersService";
import { successMsg } from "../Services/feedbackService";
import { createCart } from "../Services/cartsService";


interface RegisterProps {
    setUserInfo: Function
}

const Register: FunctionComponent<RegisterProps> = ({setUserInfo}) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {name: "", email:"", password:""},
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().required().email("Invalid email"),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values)=>{
            addUser({...values, isAdmin: false})
            .then((res) => {
                sessionStorage.setItem(
            "token",
            JSON.stringify({token: res.data,})
            );
                sessionStorage.setItem("userInfo",JSON.stringify({
                email: (getTokenDetails() as any).email,
                isAdmin: (getTokenDetails() as any).isAdmin,
                userId: (getTokenDetails() as any)._id,
            })
            );
                setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                successMsg(`${values.email} wes registered and logged in`)
                // createCart(res.data.id)
                navigate("/home")
            })
            .catch((err)=> console.log(err));
        },
    });
    return (
    <div className="container">
<form className="mb-3" onSubmit={formik.handleSubmit}>
    <h3 className="display-3">Register</h3>
<div className="form-floating mb-3">
    <input
        type="text"
        className="form-control"
        id="name"
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
        type="email" 
        className="form-control" 
        id="email" 
        name= "email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        />
        <label htmlFor="email">Email address</label>
        {formik.touched.email && formik.errors.email && (
        <p className="text-danger">{formik.errors.email}</p>
        )}
</div>
<div className="form-floating">
    
    <input 
        type="password" 
        className="form-control" 
        id="password" 
        name= "password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
        />
        <label htmlFor="password"> Password</label>
    {formik.touched.password && formik.errors.password && (
        <p className="text-danger">{formik.errors.password}</p>
        )}
</div>
<div className="mt-3">
        <button disabled={!formik.isValid || !formik.dirty} type="submit" className="btn btn-success w-100">REGISTER</button> </div>
        <Link to="/">Already have user? Login here</Link>
    </form>
    </div>
    );
}
 
export default Register;