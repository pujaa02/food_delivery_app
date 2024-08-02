import React from "react";
import "./wrong.css";

const Wrongurl: React.FC = () => {
    return (
        <div className="middle">
            <img src={require(`./wrong.gif`)} alt="none" />
        </div>
    );
}

export default Wrongurl;