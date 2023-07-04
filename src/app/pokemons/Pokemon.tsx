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

// Helper function to retrieve data from cache
const getDataFromCache = async (cacheName: string, key: string) => {
  const cache = await caches.open(cacheName);
  const pokemonResponse = await cache.match(`${key}_data`);
  const imageResponse = await cache.match(`${key}_image`);
  if (pokemonResponse && imageResponse) {
    const pokemon = await pokemonResponse.json();
    const image = await imageResponse.blob();
    return { pokemon, image };
  }
  return null;
};

// Helper function to cache data
const cacheData = async (
  cacheName: string,
  key: string,
  data: { pokemon: PokemonAPI; image: Blob },
) => {
  const cache = await caches.open(cacheName);
  const pokemonResponse = new Response(JSON.stringify(data.pokemon));
  const imageResponse = new Response(data.image);
  await cache.put(`${key}_data`, pokemonResponse);
  await cache.put(`${key}_image`, imageResponse);
};

async function getPokemonInfo(pokemonId: number) {
  const cacheName = "pokemon-cache";
  const cacheKey = `pokemon_${pokemonId}`;

  // Check if data is present in cache
  const cachedData = await getDataFromCache(cacheName, cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Fetch Pokemon data
    const pokemonResponse: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData: PokemonAPI = await pokemonResponse.json();

    // Fetch Pokemon image
    const imageResponse: Response = await fetch(`/img/pokemons/sprites/image${pokemonId}.png`);
    const imageBlob = await imageResponse.blob();

    // Cache the data
    const data = {
      pokemon: pokemonData,
      image: imageBlob,
    };
    await cacheData(cacheName, cacheKey, data);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Pokemon({ pokemonId }: { pokemonId: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState<
    Blob | { pokemon: PokemonAPI; image: Blob } | null
  >(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

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

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const info = await getPokemonInfo(pokemonId);
      setPokemonInfo(info);
      // Simulate a loading delay of 1 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    fetchPokemonInfo();
  }, [pokemonId]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const cacheName = "pokemon-cache";
        const cacheKey = `pokemon_${pokemonId}`;

        const cachedData = await getDataFromCache(cacheName, cacheKey);
        if (cachedData && cachedData.pokemon && cachedData.image) {
          setImageBlob(cachedData.image);
        } else {
          const response = await fetch(`/img/pokemons/sprites/image${pokemonId}.png`);
          const blob = await response.blob();
          setImageBlob(blob);
          // Cache the image data
          if (pokemonInfo) {
            await cacheData(
              cacheName,
              cacheKey,
              pokemonInfo as { pokemon: PokemonAPI; image: Blob },
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, [pokemonId, pokemonInfo]);

  if (isLoading || !pokemonInfo) {
    return <PokemonCardSkeleton />;
  }

  return (
    <Link href={`/pokemons/${pokemonId}`}>
      <div
        className={`relative flex items-start justify-start px-24 py-10 mx-4 my-4 h-40 rounded-2xl bg-cover bg-center bg-no-repeat hover:opacity-[0.85] ${getTypeColours(
          (
            pokemonInfo as { pokemon: PokemonAPI; image: Blob }
          ).pokemon.types[0].type.name.toString() || "",
        )}`}
        style={{
          backgroundImage: `url("/img/pokeball-bg.svg")`,
        }}
      >
        <div className="flex flex-col justify-between ml-10">
          <div className="text-white font-bold mb-2 relative bottom-7 right-[7.5rem]">
            {"# " + pokemonId}
          </div>

          <div className="text-white text-2xl max-sm:text-xl font-bold mb-2 relative bottom-7 right-[7.5rem]">
            {capitalizeFirstLetter(
              (pokemonInfo as { pokemon: PokemonAPI; image: Blob }).pokemon.name.toUpperCase() ||
                "",
            )}
          </div>

          <div className="relative bottom-5 right-[7.5rem]">
            <Image
              src={`/img/types/${(
                pokemonInfo as { pokemon: PokemonAPI; image: Blob }
              ).pokemon.types[0].type.name.toString()}.png`}
              width={100}
              height={100}
              priority={true}
              alt="Pokemon Type"
              className="mb-1"
            />

            {(pokemonInfo as { pokemon: PokemonAPI; image: Blob }).pokemon.types[1] !==
              undefined && (
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

        {imageBlob && (
          <Image
            src={URL.createObjectURL(imageBlob)}
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
