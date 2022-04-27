import axios from "axios";
import { PokemonDetail } from "../interfaces/pokemonDetails";
import { getPokemonDetails } from "./getPokemonDetails";

export interface PokemonListInterface {
    name: string;
    url: string;
}

interface ListPokemonInterface {
    count: number;
    next: null | string;
    previous: null | string;
    results: PokemonDetail[]
}

export async function listPokemon(num: number): Promise<ListPokemonInterface> {
    const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon?limit=${num}&offset=0`;

    const response = await axios.get<ListPokemonInterface>(endpoint);

    const promiseArr = response.data.results.map(({name}) => getPokemonDetails(name));
    const resultsPromise = await Promise.all(promiseArr)

    return {
        ...response.data,
        results: resultsPromise
    };
}