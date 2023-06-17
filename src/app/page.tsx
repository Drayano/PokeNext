import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-between p-24">
      <div className="text-center text-7xl">PokeNext</div>

      <div className="mb-32 flex space-x-24 items-center text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link href="/pokemons">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Pokemons <span className="inline-block text-center">-&gt;</span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about each Pokemon.
          </p>
        </Link>

        <Link href="/moves">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Moves <span className="inline-block text-center">-&gt;</span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about each Move.
          </p>
        </Link>

        <Link href="/items">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Items <span className="inline-block text-center">-&gt;</span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about each Item.
          </p>
        </Link>
      </div>
    </main>
  );
}
