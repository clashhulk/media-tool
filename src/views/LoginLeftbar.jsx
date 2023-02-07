import React from "react";
import './views.css';
import vectorImg from '../assets/01-Login-media.png';


function LoginLeftBar() {
    return (
        <div className="LeftBarImage">
            <img src={vectorImg} className="mediaLogin-Img" alt="" />
        </div>
    );
}

export default LoginLeftBar;