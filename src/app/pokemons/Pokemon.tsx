import Image from "next/image";
import Link from "next/link";

export default function Pokemon({ pokemonId }: { pokemonId: number }) {
  return (
    <div>
      <Link href={`/pokemons/${pokemonId}`}>
        <Image
          src={`/img/pokemons/sprites/image${pokemonId}.png` ?? "/img/unown_error.avif"}
          width={75}
          height={75}
          priority={true}
          alt="Pokemon Sprite"
        />
      </Link>
    </div>
  );
}
