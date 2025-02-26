import axios from "axios";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100";

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  moves: { move: { name: string } }[];

}


export const fetchpokemon = async (): Promise<Pokemon[]> => {
  try {
    // Fetch the list of Pokémon
    const { data } = await axios.get(POKEMON_API_URL);

    // Fetch detailed Pokémon data in parallel
    const detailedData = await Promise.all(
      data.results.map(async (pokedata: { url: string }) => {
        const { data } = await axios.get<Pokemon>(pokedata.url);
        return data;
      })
    );

    return detailedData; // ✅ Now contains complete Pokémon details
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return []; // Return empty array if fetch fails
  }
};
