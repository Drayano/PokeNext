import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PokemonAPI } from "./[id]/PokemonInterfaces";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypeColours(type: string): string {
  type = type.toLowerCase();

  if (type === "grass") {
    return `bg-[#8bbe8a]`;
  } else if (type === "water") {
    return `bg-[#58abf6]`;
  } else if (type === "fire") {
    return `bg-[#ffa756]`;
  } else if (type === "bug") {
    return `bg-[#8bd674]`;
  } else if (type === "normal") {
    return `bg-[#b5b9c4]`;
  } else if (type === "poison") {
    return `bg-[#9f6e97]`;
  } else if (type === "fairy") {
    return `bg-[#eba8c3]`;
  } else if (type === "ground") {
    return `bg-[#f78551]`;
  } else if (type === "electric") {
    return `bg-[#f2cb55]`;
  } else if (type === "fighting") {
    return `bg-[#eb4971]`;
  } else if (type === "psychic") {
    return `bg-[#ff6568]`;
  } else if (type === "flying") {
    return `bg-[#748fc9]`;
  } else if (type === "rock") {
    return `bg-[#6f6e78]`;
  } else if (type === "ice") {
    return `bg-[#91d8df]`;
  } else if (type === "dragon") {
    return `bg-[#7383b9]`;
  } else if (type === "ghost") {
    return `bg-[#8571be]`;
  } else if (type === "steel") {
    return `bg-[#4c91b2]`;
  } else if (type === "dark") {
    return `bg-[#4c91b2]`; // TODO : CHANGE THE COLOR
  } else {
    return "";
  }
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
      <div
        className={`relative flex items-start justify-start px-24 py-10 rounded-2xl bg-cover bg-center bg-no-repeat mx-4 my-4 ${getTypeColours(
          pokemonInfo?.types[0].type.name.toString() || "",
        )}`}
        style={{
          backgroundImage: `url("/img/pokeball-bg.svg")`,
          height: "130px",
        }}
      >
        <div className="flex flex-col justify-between ml-10">
          <div
            className="text-white font-bold mb-2"
            style={{
              position: "relative",
              bottom: "25px",
              right: "120px",
            }}
          >
            {"#" + pokemonId}
          </div>

          <div
            className="text-white font-bold mb-2"
            style={{
              position: "relative",
              bottom: "30px",
              right: "120px",
            }}
          >
            {capitalizeFirstLetter(pokemonInfo?.name || "")}
          </div>

          <div
            className="text-white"
            style={{
              position: "relative",
              bottom: "25px",
              right: "100px",
            }}
          >
            {types}
          </div>
        </div>

        <Image
          src={`/img/pokemons/sprites/image${pokemonId}.png`}
          unoptimized
          width={100}
          height={100}
          priority={true}
          alt="Pokemon Sprite"
          style={{
            position: "absolute",
            right: "47px", // Adjust the right position as per your requirement
            bottom: "15px", // Adjust the bottom position as per your requirement
          }}
        />
      </div>
    </Link>
  );
}
