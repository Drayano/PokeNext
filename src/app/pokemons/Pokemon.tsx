import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import PokemonCardSkeleton from "./PokemonCardSkeleton";
import { PokemonAPI, PokemonData } from "./PokemonInterfaces";
import { getPokemonInfo } from "./PokemonFetching";

function getTypeColours(type: string): string {
  type = type.toLowerCase();

  switch (type) {
    case "bug":
      return "bg-[#8bd674]";
    case "dark":
      return "bg-[#4c91b2]"; // TODO: CHANGE THE COLOR
    case "dragon":
      return "bg-[#7383b9]";
    case "electric":
      return "bg-[#f2cb55]";
    case "fairy":
      return "bg-[#eba8c3]";
    case "fighting":
      return "bg-[#eb4971]";
    case "fire":
      return "bg-[#ffa756]";
    case "flying":
      return "bg-[#748fc9]";
    case "ghost":
      return "bg-[#8571be]";
    case "grass":
      return "bg-[#8bbe8a]";
    case "ground":
      return "bg-[#f78551]";
    case "ice":
      return "bg-[#91d8df]";
    case "normal":
      return "bg-[#b5b9c4]";
    case "poison":
      return "bg-[#9f6e97]";
    case "psychic":
      return "bg-[#ff6568]";
    case "rock":
      return "bg-[#6f6e78]";
    case "steel":
      return "bg-[#4c91b2]";
    case "water":
      return "bg-[#58abf6]";
    default:
      return "";
  }
}

const calculatePokemonRightOffset = (windowWidth: number): string => {
  let rightOffset: string;

  switch (true) {
    case windowWidth >= 400:
      rightOffset = "45px";
      break;
    case windowWidth >= 340 && windowWidth <= 399:
      rightOffset = "30px";
      break;
    case windowWidth >= 300 && windowWidth <= 339:
      rightOffset = "10px";
      break;
    case windowWidth <= 299:
      rightOffset = "-10px";
      break;
    default:
      rightOffset = "";
      break;
  }

  return rightOffset;
};

export default function Pokemon({ pokemonId }: { pokemonId: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState<PokemonData | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the window width whenever the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const info = await getPokemonInfo(pokemonId);
      setPokemonInfo(info);
      // Simulate a loading delay of 1 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchPokemonInfo();
  }, [pokemonId]);

  if (isLoading || !pokemonInfo) {
    return <PokemonCardSkeleton />;
  }

  return (
    <Link href={`/pokemons/${pokemonId}`}>
      <div
        className={`relative flex items-start justify-start px-24 py-10 mx-4 my-4 h-40 rounded-2xl bg-cover bg-center bg-no-repeat hover:opacity-[0.85] ${getTypeColours(
          pokemonInfo.pokemon.types[0].type.name.toString() || "",
        )}`}
        style={{
          backgroundImage: `url("/img/pokeball-bg.svg")`,
        }}
      >
        <div className="flex flex-col justify-between ml-10">
          <div className="text-white font-bold mb-2 relative bottom-7 right-[7.5rem]">
            {"# " + pokemonId}
          </div>

          <div
            className={`text-white ${
              pokemonInfo.pokemon.name.toUpperCase().length >= 11 ? "text-lg" : "text-2xl"
            } max-sm:text-xl font-bold mb-2 relative bottom-7 right-[7.5rem]`}
          >
            {pokemonInfo.pokemon.name.toUpperCase() || ""}
          </div>

          <div className="relative bottom-5 right-[7.5rem]">
            <Image
              src={`/img/types/${pokemonInfo.pokemon.types[0].type.name.toString()}.png`}
              width={100}
              height={100}
              priority={true}
              alt="Pokemon Type"
              className="mb-1"
            />

            {pokemonInfo.pokemon.types[1] !== undefined && (
              <Image
                src={`/img/types/${(
                  pokemonInfo as { pokemon: PokemonAPI; image: Blob }
                ).pokemon.types[1].type.name.toString()}.png`}
                width={100}
                height={100}
                priority={true}
                alt="Pokemon Type"
              />
            )}
          </div>
        </div>

        {pokemonInfo.image && (
          <Image
            src={URL.createObjectURL(pokemonInfo.image)}
            unoptimized
            width={100}
            height={100}
            priority={true}
            alt="Pokemon Sprite"
            className={`absolute bottom-8`}
            style={{
              right: calculatePokemonRightOffset(windowWidth),
            }}
          />
        )}
      </div>
    </Link>
  );
}
