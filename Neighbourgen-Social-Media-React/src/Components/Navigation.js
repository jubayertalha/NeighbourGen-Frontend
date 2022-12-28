import React from 'react';
import {useNavigate} from "react-router-dom";
import axiosConfig from './axiosConfig';
import './CSS/Home.css'


const Navigation = () => {
    let navigate = useNavigate();

    const Logout = () => {
        axiosConfig.post("logout")
        .then(resp=>{
            console.log(resp.data);
            localStorage.removeItem('user');
            window.location.reload(false);
            navigate("/");
        }).catch(err=>{
            console.log(err);
        });
    }
    const Home = () => {
        navigate("/");
    }
    const Profile = () => {
        navigate("/profile");
    }

    return (
        <div>
            <div className="header">
                <h1 className="welcome" onClick={Home}>NeighbourGen</h1>
                <div className="btn">
                    <button className="buttonLogout" onClick={Profile}>Profile</button>
                    <button className="buttonLogout" onClick={Logout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Navigation;