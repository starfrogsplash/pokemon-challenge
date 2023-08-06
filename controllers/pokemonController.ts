import axios from 'axios';
import { Pokemon } from '../utils/interfaces'
import { extractPokemonId } from '../utils/extractPokemonId'
import { pokemonCache } from '../utils/pokemonCache'

const fetchPokemonData = async (): Promise<Pokemon[]> => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemonUrls = response.data.results.map((pokemon: { url: string }) => pokemon.url);

  const detailResponses = await Promise.all(
    pokemonUrls.map(async (url: string) => {
      const id = extractPokemonId(url);

      if (pokemonCache[id]) {
        return { data: pokemonCache[id] };
      } 

      const response = await axios.get(url);

      pokemonCache[id] = response.data;
      return response;
    })
  );

  const pokemonList: Pokemon[] = detailResponses.map(({ data }) => {
    const { id, name, stats, types } = data;
    return {
      id,
      name,
      stats,
      types,
    };
  });

  return pokemonList;
};

export {
    fetchPokemonData
}
