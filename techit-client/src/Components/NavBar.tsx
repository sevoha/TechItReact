import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../Services/feedbackService";

interface NavBarProps {
    userInfo: any;
    setUserInfo: Function
}
 
const NavBar: FunctionComponent<NavBarProps> = ({userInfo, setUserInfo}) => {
    let navigate = useNavigate()
    return (<>
<nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
    <NavLink className="navbar-brand" to="/home"><img className="App-logo" src={("/image/logo.png")}/>TechIt</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
        {userInfo.email && (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink className="nav-link" to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/cart">Cart</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li>
        </ul>
        <button className="btn btn-primary" onClick={() => {
            setUserInfo({userEmail: false, isAdmin: false})
            successMsg("Come Back Soon Please")
            sessionStorage.removeItem("userInfo")
            navigate("/");
            }}>LogOut</button>
    </div>
        )}    </div>
</nav>
    </>);
}
 
export default NavBar;