import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"
import { errorMsg, successMsg } from "../Services/feedbackService";
import { checkUser, getTokenDetails } from "../Services/usersService";


interface LoginProps {
    setUserInfo: Function
}
 
const Login: FunctionComponent<LoginProps> = ({setUserInfo}) => {
    let navigate = useNavigate()
    let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
        checkUser(values)
        .then((res)=> {
            sessionStorage.setItem("token",JSON.stringify({token: res.data})
            );
                sessionStorage.setItem("userInfo",JSON.stringify({
                email: (getTokenDetails() as any).email,
                isAdmin: (getTokenDetails() as any).isAdmin,
                userId: (getTokenDetails() as any)._id,
            })
            );
                setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                
                successMsg(`Welcome Back ${values.email}`)
                navigate("/home");
        })
        .catch((err)=> console.log(err))
        },
    })
    return (<>
    <div className="container">
<form className="mb-3" onSubmit={formik.handleSubmit}>
    <h3 className="display-3">LOGIN</h3>
<div className="form-floating mb-3">
    <input 
        type="email" 
        id="email"
        className="form-control" 
        placeholder="name@example.com"
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
        id="password"
        className="form-control" 
        placeholder="Password"
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
        <button type="submit" className="btn btn-success w-100">LogIn</button> </div>
    </form>
            <Link to="/register">New user? Register here</Link>

    </div>
    </>);
}
 
export default Login;