import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    let[username, setUserName] = useState("");
    let[password, setPassword] = useState("");
    let navigate = useNavigate();

    const loginSubmit= (e)=>{
        e.preventDefault();
        var obj = {username: username, password: password};
        axios.post("http://127.0.0.1:8000/api/login",obj)
        .then(resp=>{
            if(resp.data !== "Invalid Credentials"){
                var token = resp.data;
                var user = {user_Id: token.user_id, access_token:token.token};
                localStorage.setItem('user', JSON.stringify(user));
                console.log('LOGIN SUCCESS');
                navigate("/");  
            }else{
                alert("Invalid Credentials");
            }
        }).catch(err=>{
            console.log(err);
        });
    }  
    return(
        <div className="container" style={{marginTop: 100, marginRight: 100}}>
            <form style={{marginTop: 100, marginRight: 450, marginLeft: 400}}>
                <h1>Login</h1><br></br>
                <label className="form-label">User ID</label>
                <input className="form-control" type="text" value={username} onChange={(e)=>setUserName(e.target.value)} />
                <label className="form-label">Password</label>
                <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br></br>
                <button className= "btn btn-success btn-lg" onClick={(e) => {loginSubmit(e)}}>Login</button><br></br><br></br>
                <p>Don't have any account?</p>
                <u><Link to="/registration"> Create an account</Link></u>
            </form>
        </div>

    ) 
}

export default Login;