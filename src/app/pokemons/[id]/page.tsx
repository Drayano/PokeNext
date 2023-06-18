"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { PokemonAPI } from "./PokemonInterfaces";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getPokemonInfo(pokemonId: number) {
  const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const result: PokemonAPI = await response.json();
  return result;
}

export default async function PokemonDetails() {
  const pathname = usePathname();
  const id = parseInt(pathname.replace("/pokemons/", ""));

  const pokemonInfo: PokemonAPI = await getPokemonInfo(id);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-between p-24">
      <Image
        src={`/img/pokemons/artworks/image${id}.avif` ?? "/img/unown_error.avif"}
        width={300}
        height={300}
        priority={true}
        alt="Pokemon Artwork"
      />

      <div>{capitalizeFirstLetter(pokemonInfo.name)}</div>
    </main>
  );
}
