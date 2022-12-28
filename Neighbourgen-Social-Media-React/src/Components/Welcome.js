import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Welcome = () => {
    useEffect(()=>{
        console.log("Welcome");
    },[]);
    let navigate = useNavigate();
    const Login = () => {
        navigate("/login");
    }
    const Registration = () => {
        navigate("/registration");
    }
    return(
        <div>
            <div className="jumbotron text-center">
                <h1>Welcome to NeighbourGen</h1>
                <p>Let's connect to your neighbours.</p> 
            </div>
            <div className="text-center">
                <button className="btn btn-success btn-lg" style={{margin: 20}} onClick={Login}>Login</button>
                <button className="btn btn-primary btn-lg" style={{margin: 20}} onClick={Registration}>Register</button>
            </div>  
            
        </div>
    )
}

export default Welcome;