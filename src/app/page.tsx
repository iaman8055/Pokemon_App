"use client";
import Image from "next/image";
import { fetchpokemon, Pokemon } from "@/api/api";
import PokeCard from "@/Component/Pokecard/PokeCard";
import React, { useEffect, useState } from "react";
import pokemonpic from "../../public/pngegg.png";

const Page = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Pokémon per page

  useEffect(() => {
    const getPokemon = async () => {
      const data: Pokemon[] = await fetchpokemon(); // ✅ Ensure fetchpokemon returns correct type
      setPokemon(data);
    };
    getPokemon();
  }, []);

  // Filter Pokémon by search input
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  // Get Pokémon for the current page
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Image
          src={pokemonpic}
          alt="Pokemon Logo"
          width={300}
          height={150}
          className="mb-5 md:mb-0"
        />

        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to page 1 when searching
          }}
          className="w-full md:w-72 h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold font-serif text-center mt-8">
        Welcome to Pokémon World
      </h1>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
        {paginatedPokemon.length > 0 ? (
          paginatedPokemon.map((p) => <PokeCard key={p.id} pokeData={p} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No Pokémon Found
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
