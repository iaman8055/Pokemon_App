"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Pokemon } from "@/api/api";

// Define the shape of the Pokémon data

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    };

    if (id) fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <p className="text-white text-center">Loading Pokémon details...</p>;
  }

  return (
    <div className="w-full flex justify-center mt-20">
      <div className="bg-gray-900 text-white p-6 rounded-3xl w-fit flex flex-col items-center">
        <h1 className="text-4xl font-bold uppercase">{pokemon.name}</h1>
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={256}
          height={256}
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
            {pokemon.stats.find((stat) => stat.stat.name === "speed")
              ?.base_stat || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Attack:</span>{" "}
            {pokemon.stats.find((stat) => stat.stat.name === "attack")
              ?.base_stat || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Moves:</span>{" "}
            {pokemon.moves
              .slice(0, 3)
              .map((move) => move.move.name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
