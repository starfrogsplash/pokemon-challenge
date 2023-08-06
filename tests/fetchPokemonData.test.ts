import axios from 'axios';
import { fetchPokemonData } from '../controllers/pokemonController';
import { pokemonCache } from '../utils/pokemonCache';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchPokemonData', () => {
    beforeEach(() => {
    for (const key in pokemonCache) {
      delete pokemonCache[key];
    }

    jest.clearAllMocks();
    
  });

  it('should fetch Pokémon data from the API and return the correct data', async () => {
    const mockedApiResponse = {
      data: {
        results: [
          { url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'Bulbasaur' },
          { url: 'https://pokeapi.co/api/v2/pokemon/2/', name: 'Ivysaur' },
        ],
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockedApiResponse);

    const mockedPokemonData = [
      {
        id: 1,
        name: 'Bulbasaur',
        stats: { hp: 45, attack: 49, defense: 49 },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      },
      {
        id: 2,
        name: 'Ivysaur',
        stats: { hp: 60, attack: 62, defense: 63 },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      },
    ];

    mockedPokemonData.forEach((pokemon) => {
      mockedAxios.get.mockResolvedValueOnce({ data: pokemon });
    });

    const pokemonList = await fetchPokemonData();

    expect(pokemonList).toHaveLength(2);
    expect(pokemonList[0].name).toBe('Bulbasaur');
    expect(pokemonList[0].stats).toEqual({ hp: 45, attack: 49, defense: 49 });
    expect(pokemonList[0].types).toEqual([
      { type: { name: 'grass' } },
      { type: { name: 'poison' } },
    ]);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/1/'
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/2/'
    );
  });

  it('should handle errors when the API request fails', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchPokemonData()).rejects.toThrow(errorMessage);
  });


  it('should use cached data when available', async () => {
    const mockedApiResponse = {
        data: {
          results: [
            { url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'Bulbasaur' },
            { url: 'https://pokeapi.co/api/v2/pokemon/2/', name: 'Ivysaur' },
          ],
        },
      };
      mockedAxios.get.mockResolvedValueOnce(mockedApiResponse);

    const mockedPokemonData = [
      {
        id: 1,
        name: 'Bulbasaur',
        stats: { hp: 45, attack: 49, defense: 49 },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      },
      {
        id: 2,
        name: 'Ivysaur',
        stats: { hp: 60, attack: 62, defense: 63 },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      },
    ];

    mockedPokemonData.forEach((pokemon) => {
      mockedAxios.get.mockResolvedValueOnce({ data: pokemon });
    });

    // First call should fetch data from the API and cache it
    const pokemonList1 = await fetchPokemonData();

    mockedAxios.get.mockResolvedValueOnce(mockedApiResponse);

    // Second call should use the cached data
    const pokemonList2 = await fetchPokemonData();

    expect(pokemonList1).toEqual(pokemonList2);
    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
  });

});
