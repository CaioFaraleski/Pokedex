import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import { PokemonDetail } from '../pokemon/interfaces/pokemonDetails';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemon, PokemonListInterface } from '../pokemon/services/listPokemon';

interface PokedexProps {
    
}

const Pokedex: React.FC<PokedexProps> = () => {
    const [pokemon, setPokemon] = useState<PokemonListInterface[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonListInterface | undefined>(undefined);
    const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);
    
    useEffect(() => {
        listPokemon().then(response => setPokemon(response.results))
    }, []);

    useEffect(() => {
        if (!selectedPokemon) return;

        getPokemonDetails(selectedPokemon.name)
        .then(response => setSelectedPokemonDetails(response))
    }, [selectedPokemon]);

    return (
        <div>
            <h1>Pokedex</h1>

            {pokemon.map(pokemon => <button onClick={() => setSelectedPokemon(pokemon)}>{pokemon.name}</button>)}

            <h2>Pokémon selecionado: {selectedPokemon?.name || 'Nenhum Pokémon selecionado'}</h2>
            {JSON.stringify(selectedPokemonDetails, undefined, 2)}
        </div>
    );
};

export default Pokedex;