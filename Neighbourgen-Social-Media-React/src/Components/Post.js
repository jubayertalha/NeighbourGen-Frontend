import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosConfig from './axiosConfig';
import './CSS/Post.css'

const Post = (props) => {
    const post = props.data;
    let[reactions, setReactions] = useState(post.reactions);
    let[reaacted, setReaacted] = useState(post.hasReacted === 1 ? "Unlike" : "Like");
    let[hasReacted, setHasReacted] = useState(post.hasReacted === 1 ? "true" : "false");
    let[comment, setComment] = useState("");
    let[comments, setComments] = useState(post.comments);
    let navigate = useNavigate();

    const like = () => {
        if(reaacted === "Like"){
            setReaacted("Unlike");
            setReactions(reactions+1);
        }else{
            setReaacted("Like");
            setReactions(reactions-1);
        }
        var obj = {post_id: post.post.id, hasReacted: hasReacted};
        axiosConfig.post("reaction", obj)
            .then(resp=>{
                console.log(resp.data);
                setHasReacted(hasReacted === "true" ? "false" : "true");
            }
            ).catch(err=>{
                console.log(err);
            }
        );
    }
    const addComment = () => {
        var obj = {comment: comment};
        axiosConfig.post("post/"+post.post.id, obj)
            .then(resp=>{
                console.log(resp.data);
                setComments(comments+1);
                setComment("");
            }
            ).catch(err=>{
                console.log(err);
            }
        );
    }
    const details = () => {
        navigate("/post/"+post.post.id);
    }
    return(
        <div>
            <div className="post">
                <div className="postDetails" onClick={details}>
                    <h4 className="card-title">{post.creator.name}</h4>
                    <p className="card-text">{post.post.title}</p>
                    {reactions} Reactions | {comments} Comments<br></br><br></br>
                </div>
                <div className="reaction">
                    <button className="buttonReaction" onClick={like}>{reaacted}</button>
                    <input className="inputComment" type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Write Comment"></input>
                    <button className="buttonComment" onClick={addComment}>Comment</button>
                </div>
            </div>
        </div>
    )
}

export default Post;