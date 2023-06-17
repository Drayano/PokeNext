import Image from "next/image";

export default function Pokemon({ pokemonId }: { pokemonId: number }) {
  return (
    <div>
      <Image
        src={`/img/pokemons/artworks/image${pokemonId}.avif` ?? "/img/unown_error.avif"}
        width={150}
        height={150}
        loading="lazy"
        priority={false}
        alt="Pokemon Sprite"
      />
    </div>
  );
}
