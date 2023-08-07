import { PrismaClient } from '@prisma/client';
import { pokemonList } from './seedData'

const prisma = new PrismaClient();

async function createPokemon() {
  try {
    for (const pokemon of pokemonList) {
      const newPokemon = await prisma.pokemon.upsert({
        where: { name: pokemon.name },
        update: {},
        create: {
          name: pokemon.name,
          stats: {
            create: pokemon.stats.map((stat) => ({
              name: stat.stat.name,
              base_stat: stat.base_stat,
              effort: stat.effort,
            })),
          },
          types: {
            create: pokemon.types.map((type) => ({
              name: type.type.name,
              slot: type.slot,
            })),
          },
        },
      });

      console.log('Created Pokemon:', newPokemon);
    }
  } catch (error) {
    console.error('Error creating Pokemon:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createPokemon();
