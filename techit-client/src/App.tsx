import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import PageNotFound from './Components/PageNotFound';
import { useState } from 'react';
import Profile from './Components/Profile';
import Products from './Components/Products';
import NavBar from './Components/NavBar';
import NewProducts from './Components/NewProduct';
import UpdateProduct from './Components/UpdateProduct';
import Cart from './Components/Cart';


function App() {
  let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo") as string)== null ? {userEmail:false, isAdmin: false} : JSON.parse(sessionStorage.getItem("userInfo") as string))

  

  return (
    <div className="App">
      <ToastContainer theme='dark'/>
      <Router>
        <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
        <Routes>
          <Route path='/' element={<Login setUserInfo={setUserInfo}  />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register setUserInfo={setUserInfo}/>} />
          <Route path='/profile' element={<Profile />}/>
          <Route path='/products' element={<Products  userInfo={userInfo}/>}/>
          <Route path='/newProduct' element={<NewProducts  />}/>
          <Route path='/updateProduct/:id' element={<UpdateProduct  />}/>
          <Route path='/cart' element={<Cart  />}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
