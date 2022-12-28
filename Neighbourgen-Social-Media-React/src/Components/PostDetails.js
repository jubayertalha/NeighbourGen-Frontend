import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosConfig from './axiosConfig';
import './CSS/Post.css'
import Navigation from "./Navigation";

const PostDetails = () => {
    const params = useParams();
    const postID = params.id;
    let[post, setPost] = useState();
    let[reactions, setReactions] = useState(0);
    let[reacted, setReacted] = useState("Like");
    let[hasReacted, setHasReacted] = useState("false");
    let[comment, setComment] = useState("");
    let[comments, setComments] = useState(0);
    let[user, setUser] = useState("");
    let[postTitle, setPostTitle] = useState("");
    let[detailComments, setDetailComments] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{
        axiosConfig.get("post/"+postID)
        .then(resp=>{
            console.log(resp.data);
            var p = resp.data;
            setPost(p);
            setReactions(p.reactionCount);
            setReacted(p.hasReacted === 1 ? "Unlike" : "Like");
            setHasReacted(p.hasReacted === 1 ? "true" : "false");
            setComments(p.commentCount);
            setUser(p.user.name);
            setPostTitle(p.post.title);
            setDetailComments(p.comments);
        }).catch(err=>{
            console.log(err);
        });
    },[]);

    const like = () => {
        if(reacted === "Like"){
            setReacted("Unlike");
            setReactions(reactions+1);
        }else{
            setReacted("Like");
            setReactions(reactions-1);
        }
        var obj = {post_id: postID, hasReacted: hasReacted};
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
        axiosConfig.post("post/"+postID, obj)
            .then(resp=>{
                console.log(resp.data);
                setComments(comments+1);
                setComment("");
                window.location.reload(false);
            }
            ).catch(err=>{
                console.log(err);
            }
        );
    }

    return (
        <div>
            <Navigation/>
            <br></br><br></br>
            <div className="container">
                <div className="postContainer">
                    <div className="post">
                        <div className="postDetails">
                            <h4 className="card-title">{user}</h4>
                            <p className="card-text">{postTitle}</p>
                            {reactions} Reactions | {comments} Comments<br></br><br></br>
                        </div>
                        <div className="reaction">
                            <button className="buttonReaction" onClick={like}>{reacted}</button>
                            <input className="inputComment" type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Write Comment"></input>
                            <button className="buttonComment" onClick={addComment}>Comment</button>
                        </div>
                    </div>
                    <h3>Comments</h3>
                    <br></br>
                    <div className="comments">
                        {[...detailComments].reverse().map(comment=> (
                            <div className="comment" key={comment.comment.id}>
                                <h4 className="card-title">{comment.creator}</h4>
                                <p className="card-text">{comment.comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetails;