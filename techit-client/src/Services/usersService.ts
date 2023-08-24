import axios from "axios"
import User from "../Interfaces/user";
import jwt_decode from "jwt-decode"
import { userInfo } from "os";
// let api : string = `${process.env.REACT_APP_API}`;
let api : string = "http://localhost:7000/api"


// Check User logIn 
export function checkUser(userToCheck: User) {
    return axios.post(`${api}/login`, userToCheck);
}

// // GET for all Users
export function getUsers() {
    return axios.get(api)
}

// POST new user
export function addUser(newUser: User) {
    return axios.post(`${api}/register`, newUser);
}



export function getUserDetails() {
  return axios.get(`${api}/profile`, {
    headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}
export function getTokenDetails() {
    let token = JSON.parse(sessionStorage.getItem("token") as string).token;
    return jwt_decode(token);
}