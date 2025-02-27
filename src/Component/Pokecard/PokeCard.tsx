import { Pokemon } from "@/api/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import "./card.css";

interface PokeDataCardProps {
  pokeData: Pokemon;
}

const PokeDataCard: React.FC<PokeDataCardProps> = ({ pokeData }) => {
  const router = useRouter();

  return (
    <div
      key={pokeData.id}
      className="poke-card"
      onClick={() => router.push(`/pokemon/${pokeData.id}`)}
    >
      <div className="poke-card-content">
        <h2 className="poke-name">{pokeData.name}</h2>
        <div className="poke-image-wrapper">
          <Image
            src={pokeData.sprites.other["official-artwork"].front_default}
            alt={pokeData.name}
            width={120}
            height={120}
            className="poke-image"
          />
        </div>
        <div className="poke-info">
          <p className="poke-type">
            {pokeData.types.map((type) => type.type.name).join(", ")}
          </p>
          <div className="poke-stats">
            <p>
              <span className="label">Ability:</span>{" "}
              {pokeData.abilities
                .map((ability) => ability.ability.name)
                .slice(0, 1)
                .join(", ")}
            </p>
            <p>
              <span className="label">Speed:</span>{" "}
              {pokeData.stats.find((stat) => stat.stat.name === "speed")
                ?.base_stat ?? "N/A"}
            </p>
            <p>
              <span className="label">Attack:</span>{" "}
              {pokeData.stats.find((stat) => stat.stat.name === "attack")
                ?.base_stat ?? "N/A"}
            </p>
            <p>
              <span className="label">Height:</span> {pokeData.height}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeDataCard;
