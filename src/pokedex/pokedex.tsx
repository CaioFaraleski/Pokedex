import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonDetail } from '../pokemon/interfaces/pokemonDetails';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemon } from '../pokemon/services/listPokemon';

import './cardsListPokemon.scss';
import { leftZeros } from './services/leftZero';

interface PokedexProps {
    
}

const Pokedex: React.FC<PokedexProps> = () => {
    const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | undefined>(undefined);
    const history = useHistory();
    
    useEffect(() => {
        listPokemon(898).then(response => setPokemon(response.results))
    }, []);

    function handleClick(name: string) {
        history.push(`/pokemon/${name}`)
    }

    return (
        <div id='pokedex'>
            <div className='w-100 d-flex flex-wrap justify-content-around'>
                {pokemon.map(pokemon => {

                    let nameUpper: string | string[] = pokemon.name;
                    nameUpper = nameUpper.split('');
                    let firstLetter = nameUpper.shift()!;
                    firstLetter = firstLetter.toUpperCase();
                    nameUpper.unshift(firstLetter);

                    return (
                        <div className='pokemonCard mt-4' onClick={() => handleClick(pokemon.name)}>
                            <div className={`cardTop ${pokemon.types['0'].type.name}-grad p-0 m-0`}>
                                <div className='fill w-100 h-100 row p-0 m-0'>
                                    <div className={`w-25 h-100 p-0 m-0 d-flex justify-content-center align-items-start ${pokemon.types['0'].type.name} num`}>#{leftZeros(pokemon.id, 3)}</div>
                                    <div className='w-50 h-100 p-0 m-0 d-flex justify-content-center align-items-center'>
                                        <figure className='m-0'>
                                            <img className='w-100 h-100' src={`${pokemon.sprites.other?.['official-artwork'].front_default}`} alt='poke'/>
                                        </figure>
                                    </div>
                                    <div className='w-25 h-100 p-0 m-0'></div>
                                </div>
                            </div>
                            <div className='cardBottom'>
                                <div className='h-50 row p-0 m-0 name d-flex justify-content-center align-items-center'>
                                    {nameUpper}
                                </div>
                                <div className='h-50 row p-0 m-0 d-flex justify-content-center align-items-center'>
                                    {pokemon.types.map(type => {
                                        return (
                                            <span className={`${type.type.name} d-flex justify-content-center align-items-center mx-1`}>{type.type.name.toUpperCase()}</span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


export default Pokedex;