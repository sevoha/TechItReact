import { FunctionComponent } from "react";

interface HomeProps {
}
 
const Home: FunctionComponent<HomeProps> = ({}) => {
    return (<>
    <div className="container">
        <div className="row">
            <div className="col-md-12 mt-5">
            <img src="./image/xxx.jpg" alt="sea pic" style={{ width: "65rem", marginTop: "20px" }} />
            </div>
        </div>
    </div>
    </>);
}
 
export default Home;