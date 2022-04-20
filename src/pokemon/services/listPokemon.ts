import axios from "axios";

export interface PokemonListInterface {
    name: string;
    url: string;
}

interface ListPokemonInterface {
    count: number;
    next: null | string;
    previous: null | string;
    results: PokemonListInterface[]
}

export async function listPokemon(): Promise<ListPokemonInterface> {
    const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon?limit=151&offset=0`;

    const response = await axios.get<ListPokemonInterface>(endpoint);

    return response.data;
}