import React, {useEffect, useState} from "react";
import axiosConfig from './axiosConfig';
import Welcome from './Welcome';
import Home from './Home';

const Landing = () => {
    let[view, setView] = useState(<Welcome />);
    useEffect(()=>{
        axiosConfig.get("home")
        .then(resp=>{
            if(resp.data !== "User not verified"){
                view = setView(<Home data={resp.data} />);
            }else{
                view = setView(<Welcome />);
            }
        }).catch(err=>{
            console.log(err);
        });
    },[]);

    return(
        <div>
            {view}
        </div>
    )
    
}

export default Landing;