import { Pokemon } from "../utils/interfaces";
import Image from "next/image";
import { typeColors } from "./front-utils/typeColours";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="border py-4 rounded-md shadow-md bg-gray-500 flex flex-col items-center justify-between">
      <div className="mb-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-white mb-2">#{pokemon.id}</h3>
        <h3 className="text-2xl font-semibold text-white capitalize">
          {pokemon.name}
        </h3>
      </div>
      <div className="my-2 flex flex-col">
        <div className="my-4 w-40">
          <Image
            className="w-full h-auto"
            src={`/sprites/${pokemon.id}.svg`}
            alt={pokemon.name}
            width={0}
            height={0}
            priority
          />
        </div>
      </div>
      <div className="text-white text-center">
        {pokemon.stats.map((stat, i) => (
          <div key={i} className="capitalize">
            <div className="flex items-center mb-1">
              <p className="font-semibold mr-2">{stat.name}:</p>
              <p className="text-sm">{stat.base_stat}</p>
            </div>
            <div className="h-4 bg-gray-800 rounded">
              <div
                className="h-full bg-blue-500 rounded"
                style={{ width: `${(stat.base_stat / 200) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        <div>
          <p className="font-semibold mb-2">Types:</p>
          <div className="flex flex-wrap justify-center">
            {pokemon.types.map((type, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded text-white capitalize mr-2 mb-2 ${
                  typeColors[type.name.toLowerCase()] || "bg-gray-400"
                }`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
