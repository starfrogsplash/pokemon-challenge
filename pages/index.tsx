import { useEffect, useState } from "react";
import { Pokemon } from "../utils/interfaces";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";

const PokemonPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const pokemonData = await axios.get("/api/app");
      setPokemonList(pokemonData.data.pokemonList);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };


  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-600 p-4 ">
      <div className="container mx-auto">
        <div className="text-4xl font-bold text-white mb-4 text-center">
          Pokemon
        </div>
        <div className="mb-4 flex justify-center">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search Pokemon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 p-2 rounded-md shadow-md text-gray-900"
          />
        </div>
        <div className="mb-4 flex items-center justify-center"></div>
        {pokemonList.length === 0 ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonPage;
