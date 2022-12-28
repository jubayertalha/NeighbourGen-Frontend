import React, {useState, useEffect} from "react";
import axiosConfig from './axiosConfig';
import './CSS/Home.css'
import Navigation from "./Navigation";
import Post from "./Post";

const Profile = () => {
    let[posts, setPosts] = useState([]);
    let[name, setName] = useState("");
    let[email, setEmail] = useState("");
    let[neighbourhood, setNeighbourhood] = useState("");
    let[content, setContent] = useState("");

    useEffect(()=>{
        axiosConfig.get("profile")
        .then(resp=>{
            console.log(resp.data);
            setPosts(resp.data.postDtos);
            setName(resp.data.user.name);
            setEmail(resp.data.user.email);
            setNeighbourhood(resp.data.neighbourhood.name);
        }).catch(err=>{
            console.log(err);
        });
    },[]);

    const AddPost = () => {
        var obj = {title: content, content: content};
        console.log(obj);
        axiosConfig.post("home",obj)
        .then(resp=>{
            console.log(resp.data);
            window.location.reload(false);
        }
        ).catch(err=>{
            console.log(err);
        });
    }

    return (
        <div>
            <Navigation />
            <div className="container">
                <h1>Profile</h1>
                <div className="profile">
                    <h4>Name: {name}</h4>
                    <h4>Email: {email}</h4>
                    <h4>Neighbourhood: {neighbourhood}</h4>
                </div>
                <h2 className="heading">Share your update</h2>
                <textarea className="inputContent" onChange={(e)=>setContent(e.target.value)} placeholder="Write your post" rows={3} cols={50}/><br></br>
                <button className="btn btn-success" style={{marginLeft: 10}} onClick={AddPost}>Add Post</button>
                <h2>Your posts</h2><br></br>
                {[...posts].reverse().map(p=>(
                    <div className="postContainer" key={p.post.id}>
                        <Post data={p}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;