import { useEffect, useState } from "react";
import { Pokemon } from "../utils/interfaces";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";

const PokemonPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<string>("asc");

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

  const filteredPokemonList = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "id") {
        // Sort by ID (ascending order) when sortOption is "id"
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      }

      const statA =
        a.stats.find((stat) => stat.name === sortOption)?.base_stat || 0;
      const statB =
        b.stats.find((stat) => stat.name === sortOption)?.base_stat || 0;
      return sortOrder === "asc" ? statA - statB : statB - statA;
    });

  const statOptions = [
    { name: "id", display: "ID" },
    ...(pokemonList[0]?.stats || []),
  ];

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
        <div className="mb-4 flex items-center justify-center">
          {/* Sort options */}
          <label htmlFor="sortOption" className="mr-2 text-white">
            Sort by:
          </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-48 p-2 rounded-md shadow-md text-gray-900"
          >
            {statOptions?.map((stat, i) => (
              <option key={i} value={stat.name}>
                {stat.name}
              </option>
            ))}
          </select>

          {/* Sort order */}
          <label htmlFor="sortOrder" className="ml-4 text-white mr-2">
            Order: 
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-36 p-2 rounded-md shadow-md text-gray-900"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
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
