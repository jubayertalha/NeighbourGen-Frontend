import React, {useState, useEffect} from "react";
import {Link, useNavigate,} from "react-router-dom";
import axiosConfig from './axiosConfig';
import axios from "axios";
import {useParams} from "react-router-dom";
import './CSS/Home.css'
import Post from './Post';
import Navigation from "./Navigation";


const Home = (props) => {
    let[content, setContent] = useState([]);
    let[neighbourhoodName, setNeighbourhoodName] = useState("");
    const posts = props.data;
    console.log(posts);
    let navigate = useNavigate();

    const neighbourhoodID = posts[0].post.neighbourhood_id;
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/neighbourhoods")
        .then(resp=>{
            for(var i=0; i<resp.data.length; i++){
                if(resp.data[i].id === neighbourhoodID){
                    setNeighbourhoodName(resp.data[i].name);
                }
            }
        }
        ).catch(err=>{
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
            <Navigation/>
            <div className="container">
                <h2 className="heading">Share your update</h2>
                <textarea className="inputContent" onChange={(e)=>setContent(e.target.value)} placeholder="Write your post" rows={3} cols={50}/><br></br>
                <button className="btn btn-success" style={{marginLeft: 10}} onClick={AddPost}>Add Post</button>
                <h2>{neighbourhoodName} updates</h2><br></br>
                {[...posts].reverse().map(p=>(
                    <div className="postContainer" key={p.post.id}>
                        <Post data={p}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;