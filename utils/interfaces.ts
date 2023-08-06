interface Pokemon {
  id: number;
  name: string;
  stats: Stats[];
  types: Types[];
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string
  }
}  

interface Types {
  slot: number;
  type: {
    name: string;
    url: string
  }
}

export type {
    Pokemon
}