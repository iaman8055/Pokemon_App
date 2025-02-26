"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Get the dynamic route param
import Image from "next/image";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(res.data);
        setPokemon(res.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    if (id) fetchPokemonDetails();
  }, [id]);

  if (!pokemon)
    return <p className="text-white text-center">Loading Pokémon details...</p>;

  return (
    <div className="w-full bg-">
      <div className="flex flex-col items-center m-auto mt-20 bg-gray-900 text-white p-6 w-fit justify-center rounded-3xl">
        <h1 className="text-4xl font-bold uppercase">{pokemon.name}</h1>
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={120}
          height={120}
          className="w-64 h-64"
        />
        <div className="mt-4 bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-xl w-96 text-center">
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {pokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Ability:</span>{" "}
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
          <p>
            <span className="font-semibold">Speed:</span>{" "}
            {pokemon.stats.find((stat) => stat.stat.name === "speed").base_stat}
          </p>
          <p>
            <span className="font-semibold">Attack:</span>{" "}
            {
              pokemon.stats.find((stat) => stat.stat.name === "attack")
                .base_stat
            }
          </p>
          <p>
            <span className="font-semibold">Moves:</span>{" "}
            {pokemon.moves
              .map((move) => move.move.name)
              .slice(0, 3)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
