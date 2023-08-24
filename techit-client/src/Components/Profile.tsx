import { FunctionComponent, useEffect, useState } from "react";
import { getUserDetails } from "../Services/usersService";
import User from "../Interfaces/user";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
    let [userInfo, setUserInfo] = useState<User>()
    useEffect(() => {
    getUserDetails()
    .then((res) => {
        setUserInfo(res.data);
        })
    .catch((err) => console.log(err));
    }, []);
    return (<>
    <div className="container">
    <div className="row mt-5">
        <div className="col-lg-6 ">
            <div className="card text-center ">
            <div className="card-title mt-3"><h1>{userInfo?.name}</h1></div>
            <div className="card-body">
            <div className="card-text mb-5"><h3>{userInfo?.email}</h3></div>
            {userInfo?.isAdmin ? <h5> This user is <span className="colorRed" >Admin</span></h5> : <h5> Bizness user</h5>}
            </div>
            </div>
        </div>
    </div>
    </div>
    </>);
}
export default Profile;