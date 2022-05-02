import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonDetail } from './interfaces/pokemonDetails';
import { getPokemonDetails } from './services/getPokemonDetails';
import { listPokemon } from './services/listPokemon';
import './pokemonDetails.scss';

interface PokemonDetailsProps {
    
}

interface PokemonQueryParams {
    name: string
}

const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
    let { name } = useParams<PokemonQueryParams>();
    const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);
    const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);
    
    useEffect(() => {
        listPokemon(20000).then(response => setPokemon(response.results))
    }, []);

    let outOfPokedex = pokemon.map(poke => {
        if(poke.name.startsWith(`${name}-`)) return poke;
        else return null;
    });

    useEffect(() => {
        if (!name) return;

        getPokemonDetails(name)
        .then(response => {
            return (
                setSelectedPokemonDetails(response)
            )
        })
    }, []);

    return (
        
        <div className='container d-flex justify-content-center align-items-center vh'>
            <div className='w-75'>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className={`nav-link active`} id={`nav-${name}-tab`} data-bs-toggle="tab"
                        data-bs-target={`#nav-${name}`} type="button" role="tab"
                        aria-controls={`nav-${name}`} aria-selected="true">{name}</button>
                        {outOfPokedex.map(poke => {
                            if (poke === null) return;
                            return (
                                <button className={`nav-link`} id={`nav-${poke.name}-tab`} data-bs-toggle="tab"
                                data-bs-target={`#nav-${poke.name}`} type="button" role="tab"
                                aria-controls={`nav-${poke.name}`} aria-selected="true">{poke.name}</button>
                            )
                        })}
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className={`tab-pane fade show active`} id={`nav-${name}`} role="tabpanel" aria-labelledby={`nav-${name}-tab`}>
                        <div className='d-flex justify-content-around align-items-center'>
                            <figure id='pokemonImg'>
                                <img className='w-100' src={selectedPokemonDetails?.sprites.other?.['official-artwork'].front_default} alt="" />
                            </figure>
                            <div className='pokeDetails'>
                                <div className='row min title d-flex justify-content-center'>
                                    Pokémon Details
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Nº:</div><div className='col d-flex align-items-center justify-content-start'> {selectedPokemonDetails?.id}</div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Types:</div>
                                    <div className='col d-flex align-items-center justify-content-start'>
                                        {selectedPokemonDetails?.types.map(type => {
                                            return (
                                                <div className={`${type.type.name} type d-flex align-items-center justify-content-center align-items-center mx-1`}>{type.type.name.toUpperCase()}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Height:</div><div className='col d-flex align-items-center justify-content-start'>{selectedPokemonDetails?.height}</div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Weight:</div><div className='col d-flex align-items-center justify-content-start'>{selectedPokemonDetails?.weight}</div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>
                                        Abilities:    
                                    </div>
                                    <div className='col flex-column d-flex align-items-start justify-content-center'>
                                        {selectedPokemonDetails?.abilities.map(abl => {
                                            let isHidden = '';
                                            if(abl.is_hidden) isHidden = '(hidden ability)'

                                            return (
                                                <div>{abl.ability.name} {isHidden}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {outOfPokedex.map(poke => {
                        if (poke === null) return;
                        return (
                            <div className={`tab-pane fade`} id={`nav-${poke.name}`} role="tabpanel" aria-labelledby={`nav-${poke.name}-tab`}>
                        <div className='d-flex justify-content-around align-items-center'>
                            <figure id='pokemonImg'>
                                <img className='w-100' src={poke.sprites.other?.['official-artwork'].front_default} alt="" />
                            </figure>
                            <div className='pokeDetails'>
                                <div className='row min title d-flex justify-content-center'>
                                    Pokémon Details
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Nº:</div><div className='col d-flex align-items-center justify-content-start'> {selectedPokemonDetails?.id}</div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Types:</div>
                                    <div className='col d-flex align-items-center justify-content-start'>
                                        {poke.types.map(type => {
                                            return (
                                                <div className={`${type.type.name} type d-flex align-items-center justify-content-center align-items-center mx-1`}>{type.type.name.toUpperCase()}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Height:</div><div className='col d-flex align-items-center justify-content-start'>{poke.height}</div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>Weight:</div><div className='col d-flex align-items-center justify-content-start'>{poke.weight}</div>
                                </div>
                                <div className='row min'>
                                    <div className='big col d-flex align-items-center justify-content-end'>
                                        Abilities:    
                                    </div>
                                    <div className='col flex-column d-flex align-items-start justify-content-center'>
                                        {poke.abilities.map(abl => {
                                            let isHidden = '';
                                            if(abl.is_hidden) isHidden = '(hidden ability)'

                                            return (
                                                <div>{abl.ability.name} {isHidden}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    })}
                </div>

                {/* <h2 className='card'>Pokémon selecionado: {selectedPokemon?.name || 'Nenhum Pokémon selecionado'}</h2> */}
                {/* {JSON.stringify(selectedPokemonDetails, undefined, 2)} */}
            </div>
        </div>
    );
};

export default PokemonDetails;