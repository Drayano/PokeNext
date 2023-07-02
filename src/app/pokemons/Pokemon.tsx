import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PokemonAPI } from "./[id]/PokemonInterfaces";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getPokemonInfo(pokemonId: number) {
  const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const result: PokemonAPI = await response.json();
  return result;
}

export default function Pokemon({ pokemonId }: { pokemonId: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState<PokemonAPI | null>(null);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const info: PokemonAPI = await getPokemonInfo(pokemonId);
      setPokemonInfo(info);
      setIsLoading(false);
    };

    fetchPokemonInfo();
  }, [pokemonId]);

  let types = "";
  if (pokemonInfo?.types[1] !== undefined) {
    types += `${capitalizeFirstLetter(
      pokemonInfo.types[0].type.name.toString(),
    )} / ${capitalizeFirstLetter(pokemonInfo.types[1].type.name.toString())}`;
  } else {
    types += `${capitalizeFirstLetter(pokemonInfo?.types[0].type.name.toString() ?? "")}`;
  }

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder loading animation or text
  }

  return (
    <Link href={`/pokemons/${pokemonId}`}>
      <div className="rounded border-2 flex items-center p-2">
        <Image
          src={`/img/pokemons/sprites/image${pokemonId}.png` ?? "/img/unown_error.avif"}
          unoptimized
          width={75}
          height={75}
          priority={true}
          alt="Pokemon Sprite"
        />

        <div className="ml-4">
          <div className="text-white font-bold">
            {"#" + pokemonId + " - "} {capitalizeFirstLetter(pokemonInfo?.name || "")}
          </div>

          <div className="text-white">{types}</div>
        </div>
      </div>
    </Link>
  );
}
