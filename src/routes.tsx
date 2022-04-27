import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  }from "react-router-dom";
import Body from './body';
import PokemonDetails from './pokemon/pokemonDetails';
  

interface RoutesProps {
    
}

const Routes: React.FC<RoutesProps> = () => {
    return (
        <>
            <Switch>
                <Route path="/pokemon/:name">
                    <PokemonDetails />
                </Route>
                <Route path="/">
                    <Body />
                </Route>
            </Switch>
        </>
    );
};

export default Routes;