import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const pokeDataCard = ({ pokeData }) => {
  const router = useRouter();
  return (
    <div
      key={pokeData.id}
      className="relative shadow-md rounded-4xl border-[3px] "
      onClick={() => router.push(`/pokemon/${pokeData.id}`)}
    >
      <div className="p-5 w-fit">
        <h2 className="text-xl font-bold  uppercase text-start">
          {pokeData.name}
        </h2>
        <div className="flex justify-center drop-shadow-[0px_50px_100px_rgba(50,50,93,0.25)]">
          <Image
            src={pokeData.sprites.other["official-artwork"].front_default}
            alt={pokeData.name}
            width={120}
            height={120} // ✅ Explicit width
            className="object-contain m-auto"
          />
        </div>
        <div className="mt-4 text-black space-y-2 ">
          <p className="max-w-fit bg-green-400 rounded-3xl p-2 text-lg text-white font-bold">
            {pokeData.types.map((type) => type.type.name).join(", ")}
          </p>
          <div className="grid grid-cols-2 gap-x-5">
            <p>
              <span className="font-semibold">Ability:</span>{" "}
              {pokeData.abilities
                .map((ability) => ability.ability.name)
                .slice(0, 1)
                .join(", ")}
            </p>
            <p>
              <span className="font-semibold">Speed:</span>{" "}
              {
                pokeData.stats.find((stat) => stat.stat.name === "speed")
                  .base_stat
              }
            </p>
            <p>
              <span className="font-semibold">Attack:</span>{" "}
              {
                pokeData.stats.find((stat) => stat.stat.name === "attack")
                  .base_stat
              }
            </p>
            <p>
              <span className="font-semibold">Height:</span> {pokeData.height}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pokeDataCard;
