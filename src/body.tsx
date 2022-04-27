import React from "react";
import Header from "./header/header";
import Pokedex from "./pokedex/pokedex";

const Body: React.FC = () => {

    return (
        <><Header></Header>
        <div className="container">
            <Pokedex></Pokedex>
        </div></>
    );
} 

export default Body;