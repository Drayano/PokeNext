import { PokemonAPI } from "./PokemonInterfaces";

// Helper function to retrieve data from cache
export const getDataFromCache = async (
  cacheName: string,
  key: string,
): Promise<{
  pokemon: PokemonAPI;
  image: Blob;
} | null> => {
  const cache = await caches.open(cacheName);
  const pokemonResponse = await cache.match(`${key}_data`);
  const imageResponse = await cache.match(`${key}_sprite`);

  if (pokemonResponse && imageResponse) {
    const pokemon: PokemonAPI = await pokemonResponse.json();
    const image: Blob = await imageResponse.blob();
    return { pokemon, image };
  }

  return null;
};

// Helper function to cache data
export const cacheData = async (
  cacheName: string,
  key: string,
  data: { pokemon: PokemonAPI; image: Blob },
) => {
  const cache = await caches.open(cacheName);
  const pokemonResponse = new Response(JSON.stringify(data.pokemon));
  const imageResponse = new Response(data.image);
  await cache.put(`${key}_data`, pokemonResponse);
  await cache.put(`${key}_sprite`, imageResponse);
};

export async function getPokemonInfo(pokemonId: number): Promise<{
  pokemon: PokemonAPI;
  image: Blob;
} | null> {
  const cacheName = "pokenext-pokemon-cache";
  const cacheKey = `pokemon_${pokemonId}`;

  // Check if data is present in cache
  const cachedData: {
    pokemon: PokemonAPI;
    image: Blob;
  } | null = await getDataFromCache(cacheName, cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    // Fetch Pokemon data
    const pokemonResponse: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData: PokemonAPI = await pokemonResponse.json();

    // Fetch Pokemon image
    const imageResponse: Response = await fetch(`/img/pokemons/sprites/image${pokemonId}.png`);
    const imageBlob: Blob = await imageResponse.blob();

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
