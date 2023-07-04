import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PokemonAPI } from "./[id]/PokemonInterfaces";
import PokemonCardSkeleton from "./PokemonCardSkeleton";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

async function getPokemonInfo(pokemonId: number) {
  const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const result: PokemonAPI = await response.json();
  return result;
}

export default function Pokemon({ pokemonId }: { pokemonId: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState<PokemonAPI | null>(null);
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

  // Looks good 1250-1920+ (3) // Looks bad 1024-1250 (3) (This i want 15px)
  // Looks good 885-1023 (2) // Looks bad 801-885 (2) (This i want 30px)
  // Looks good 540-800 (1) // Looks bad 360-540 (1) (This i want 0px or -5px)
  // OTHER THING : 360-420 doesn't look in the center
  const calculatePokemonRightOffset = (windowWidth: number): string => {
    let rightOffset: string;

    switch (true) {
      case windowWidth >= 1201 ||
        (windowWidth >= 885 && windowWidth <= 1023) ||
        (windowWidth >= 540 && windowWidth <= 800):
        rightOffset = "45px";
        break;
      case windowWidth >= 1024 && windowWidth <= 1200:
        rightOffset = "15px";
        break;
      case windowWidth >= 801 && windowWidth <= 884:
        rightOffset = "30px";
        break;
      case windowWidth >= 451 && windowWidth <= 539:
        rightOffset = "25px";
        break;
      case windowWidth >= 360 && windowWidth <= 450:
        rightOffset = "-5px";
        break;
      default:
        rightOffset = "";
        break;
    }

    return rightOffset;
  };

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const info: PokemonAPI = await getPokemonInfo(pokemonId);
      setPokemonInfo(info);
      // Simulate a loading delay of 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchPokemonInfo();
  }, [pokemonId]);

  if (isLoading) {
    return <PokemonCardSkeleton />;
  }

  return (
    <Link href={`/pokemons/${pokemonId}`}>
      <div
        className={`relative flex items-start justify-start px-24 py-10 mx-4 my-4 h-40 rounded-2xl bg-cover bg-center bg-no-repeat ${getTypeColours(
          pokemonInfo?.types[0].type.name.toString() || "",
        )}`}
        style={{
          backgroundImage: `url("/img/pokeball-bg.svg")`,
        }}
      >
        <div className="flex flex-col justify-between ml-10">
          <div className="text-white font-bold mb-2 relative bottom-7 right-[7.5rem]">
            {"#" + pokemonId}
          </div>

          <div className="text-white font-bold mb-2 relative bottom-7 right-[7.5rem]">
            {capitalizeFirstLetter(pokemonInfo?.name || "")}
          </div>

          <div className="relative bottom-5 right-[7.5rem]">
            <Image
              src={`/img/types/${pokemonInfo?.types[0].type.name.toString()}.png`}
              width={100}
              height={100}
              priority={true}
              alt="Pokemon Type"
              className="mb-1"
            />

            {pokemonInfo?.types[1] !== undefined && (
              <Image
                src={`/img/types/${pokemonInfo?.types[1].type.name.toString()}.png`}
                width={100}
                height={100}
                priority={true}
                alt="Pokemon Type"
              />
            )}
          </div>
        </div>

        <Image
          src={`/img/pokemons/sprites/image${pokemonId}.png`}
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
      </div>
    </Link>
  );
}
