import prismaClient from '../prisma/prismaClient'

const fetchPokemonData = async () => {
  return await prismaClient.pokemon.findMany({
    include: {
      stats: true,
      types: true,
    }
  });
}

export {
  fetchPokemonData
}
