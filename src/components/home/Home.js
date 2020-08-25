import React, {Component} from "react";
import "./home.css";
import MainCard from "./mainCard";
import AppInfo from "./appInfo";
import Footer from "./footer";


class Home extends Component {
    render(){
        return(
            <>
                <MainCard/>
                <AppInfo/>
                <Footer/>
            </>
        )
    };
}

export default Home;