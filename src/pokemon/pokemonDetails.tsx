import { createDecipheriv } from 'crypto';
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
        if(poke.name.startsWith(name)) return poke;
        else return null;
    });

    console.log(outOfPokedex!)


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
        
        <div className='container d-flex justify-content-center'>
            <div className='w-75'>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {outOfPokedex.map(poke => {
                            let active = '';
                            if (poke === null) return;
                            if (poke.name === name) active = ' active';
                            return (
                                <button className={`nav-link${active}`} id={`nav-${poke.name}-tab`} data-bs-toggle="tab"
                                data-bs-target={`#nav-${poke.name}`} type="button" role="tab"
                                aria-controls={`nav-${poke.name}`} aria-selected="true">{poke.name}</button>
                            )
                        })}
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    {outOfPokedex.map(poke => {
                        let showActive = '';
                        if (poke === null) return;
                        if (poke.name === name) showActive = ' show active';
                        return (
                            <div className={`row tab-pane fade${showActive}`} id={`nav-${poke.name}`} role="tabpanel" aria-labelledby={`nav-${poke.name}-tab`}>
                                <figure id='pokemonImg col'>
                                    <img className='w-100' src={poke.sprites.other?.['official-artwork'].front_default} alt="" />
                                </figure>
                                <div className='col'>
                                    <div className='row'>
                                        <div className='col'>Nº:</div><div className='col'> {poke.id}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Types:</div><div className='col'>

                                            {poke.types.map(type => {
                                                return (
                                                    <div className={`${type.type.name} d-flex justify-content-center align-items-center mx-1`}>{type.type.name.toUpperCase()}</div>
                                                )
                                            })}
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