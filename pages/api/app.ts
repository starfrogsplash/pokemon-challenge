// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchPokemonData } from '../../controllers/pokemonController'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pokemonList = await fetchPokemonData();
    res.status(200).json({pokemonList});
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(500).json({pokemonList: []});
  }
}
