import React from "react";
import axiosInstance from "../axiosApi";
import Chanbot from "./ChanBot";


const Home = () => {
    return ( 
        <>
        <div id="home">
            <p>Hello</p>
        </div>
        <Chanbot id="home" />
        </>
     );
}
 
export default Home;
