import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Select from 'react-select'

const Registration = () => {
    let[options, setOptions] = useState([]);
    let[username, setUserName] = useState("");
    let[password, setPassword] = useState("");
    let[email, setEmail] = useState("");
    let[neighbourhood, setNeighbourhood] = useState();
    let[otp, setOtp] = useState("");
    let[token, setToken] = useState("");
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/neighbourhoods")
        .then(resp=>{
            for(var i=0; i<resp.data.length; i++){
                options.push({value: resp.data[i].id, label: resp.data[i].name});
            }
        }
        ).catch(err=>{
            console.log(err);
        });
    },[]);

    const registerSubmit= (e)=>{
        e.preventDefault();
        var obj = {name: username, password: password, email: email, neighbourhood: neighbourhood};
        console.log(obj);
        alert("OTP sent to your email.");
        axios.post("http://127.0.0.1:8000/api/registration",obj)
        .then(resp=>{
            console.log(obj);
            setToken(resp.data);
            var user = {user_Id: token.user_id, access_token:token.token};
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Registration SUCCESS');
        }).catch(err=>{
            console.log(err);
        });
    }

    const verifyEmail = (e) => {
        e.preventDefault();
        var obj = {otp: otp};
        axios.post("http://127.0.0.1:8000/api/verify",obj)
        .then(resp=>{
            console.log(resp.data);
            if(resp.data !== "Otp Invalid"){
                var user = {user_Id: token.user_id, access_token:token.token};
                localStorage.setItem('user', JSON.stringify(user));
                console.log('OTP SUCCESS');
                navigate("/");
            }else{
                alert("OTP Invalid");
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    return(
        <div className="container" style={{marginTop: 100, marginRight: 100}}>
            <form style={{marginRight: 450, marginLeft: 400}}>
                <h1>Registration</h1><br></br>
                <label className="form-label">User ID</label>
                <input className="form-control" type="text" value={username} onChange={(e)=>setUserName(e.target.value)} />
                <label className="form-label">Password</label>
                <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <label className="form-label">Neighbourhood</label>
                <Select options={options} defaultValue={{label: "Select Neighbourhood", value: 0}} onChange={(e)=>setNeighbourhood(e.value)} />
                <label className="form-label">Email</label>
                <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br></br>
                <button className= "btn btn-secondary" onClick={(e) => {registerSubmit(e)}}>Send OPT</button><br></br><br></br>
                <label className="form-label">OTP</label>
                <input className="form-control" type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} /><br></br>
                <button className= "btn btn-primary btn-lg" onClick={(e) => {verifyEmail(e)}}>Register</button><br></br><br></br>
                <p>Already have an account?</p>
                <u><Link to="/login"> Login</Link></u>
            </form>
        </div>
    )
}
    
export default Registration;