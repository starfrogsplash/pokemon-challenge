interface Pokemon {
  id: number;
  name: string;
  stats: Stats[];
  types: Types[];
}

interface Stats {
  base_stat: number;
  effort: number;
  name: string;
}  

interface Types {
  slot: number;
  name: string;
}

export type {
    Pokemon
}