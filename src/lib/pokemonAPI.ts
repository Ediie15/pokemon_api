import { Inter } from 'next/font/google';

const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList() {
    try {
        const response = await fetch(`${POKEMON_API}pokemon?limit=50&offset=50`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log("data1-->getPokemonList()", data.results);
        return data.results;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getGlobalPokemon() {
    try {
        const response = await fetch(`${POKEMON_API}pokemon?limit=100000&offset=0`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log("data2-->getGlobalPokemon()", data.results);
        return data.results;
    } catch (error) {
        console.error('Error:', error);
    }
}


// getPokemon -> given a string "pikachu", get the information of pikachu
//https://pokeapi.co/api/v2/contest-type/{id or name}/
//export async function getPokemon(name: string) { // Original
    // pokemon/ditto
    //const response = await fetch(POKEMON_API + "contest-type/" + name);
    //const data = await response.json();
    //console.log("data2-->getPokemon",data)
    //return data;
//}

export async function getPokemon(name: string) {
    try {
        const listGlobal = await getGlobalPokemon();

        // Usar find para buscar el Pokémon por nombre
        const pokemon = listGlobal.find((pokemon: { name: string; }) => pokemon.name === name);
        
        if (pokemon) {
            // Retornar el objeto con nombre y URL
            console.log(`Pokemon name : ${pokemon.name}`);
            console.log(`Pokemon url ${pokemon.url}`);

            return {
                name: pokemon.name,
                url: pokemon.url
            };
        } else {
            // Retornar un mensaje si no se encuentra el Pokémon
            console.log(`Pokemon with name ${name} not found`);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


export async function getPokemonById(id: any) {
    try {
        const response = await fetch(`${POKEMON_API}pokemon/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log("data-->getPokemonById()", data.results);
        return data.results;
    } catch (error) {
        console.error('Error:', error);
    }
}