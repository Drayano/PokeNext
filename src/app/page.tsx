import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-between p-24">
      <div className="text-center text-7xl mb-12">PokeNext</div>

      <div className="flex max-lg:flex-col items-center text-center">
        <div className="py-8">
          <Link href="/pokemons">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Pokemons <span className="inline-block text-center">-&gt;</span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about each Pokemon.
            </p>
          </Link>
        </div>

        <div className="py-8">
          <Link href="/moves">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Moves <span className="inline-block text-center">-&gt;</span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about each Move.
            </p>
          </Link>
        </div>
        <div className="py-8">
          <Link href="/items">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Items <span className="inline-block text-center">-&gt;</span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about each Item.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
