"use client";

import { useState, useEffect } from "react";

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

export default function PokemonDetails() {
  const pathname = usePathname();
  const id = parseInt(pathname.replace("/pokemons/", ""));

  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState<PokemonAPI | null>(null);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const info: PokemonAPI = await getPokemonInfo(id);
      setPokemonInfo(info);
      setIsLoading(false);
    };

    fetchPokemonInfo();
  }, [id]);

  const abilitiesList: string[] = [];
  for (let index = 0; index < (pokemonInfo?.abilities.length ?? 0); index++) {
    abilitiesList.push(pokemonInfo?.abilities[index].ability.name ?? "");
  }

  let abilities = "";
  for (let index = 0; index < abilitiesList.length; index++) {
    if (index === abilitiesList.length - 1) {
      abilities += capitalizeFirstLetter(abilitiesList[index]);
    } else {
      abilities += capitalizeFirstLetter(abilitiesList[index]) + " / ";
    }
  }

  let types = "";
  if (pokemonInfo?.types[1] !== undefined) {
    types += `${capitalizeFirstLetter(
      pokemonInfo.types[0].type.name.toString(),
    )} / ${capitalizeFirstLetter(pokemonInfo.types[1].type.name.toString())}`;
  } else {
    types += `${capitalizeFirstLetter(pokemonInfo?.types[0].type.name.toString() ?? "")}`;
  }

  const formsList: string[] = [];
  for (let index = 0; index < (pokemonInfo?.forms.length ?? 0); index++) {
    formsList.push(pokemonInfo?.forms[index].name ?? "");
  }

  let forms = "";
  for (let index = 0; index < formsList.length; index++) {
    if (index === formsList.length - 1) {
      forms += capitalizeFirstLetter(formsList[index]);
    } else {
      forms += capitalizeFirstLetter(formsList[index]) + " / ";
    }
  }

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder loading animation or text
  }

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-between p-24">
      <Image
        src={`/img/pokemons/artworks/image${id}.avif` ?? "/img/unown_error.avif"}
        width={300}
        height={300}
        priority={true}
        alt="Pokemon Artwork"
      />

      <div>
        {"#" + id + " - "} {capitalizeFirstLetter(pokemonInfo?.name || "")}
      </div>

      <div>{"Abilities : " + abilities}</div>
      <div>{"Types : " + types}</div>
      <div>{"Forms : " + forms}</div>
    </main>
  );
}
