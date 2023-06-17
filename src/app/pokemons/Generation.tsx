import Pokemon from "./Pokemon";
export default function Generation({ start, end }: { start: number; end: number }) {
  const pokemonIdsGen = [];
  for (let id = start; id <= end; id++) {
    pokemonIdsGen.push(id);
  }
  return (
    <div className="mt-16">
      <div className="grid grid-cols-12 max-lg:grid-cols-6 max-sm:grid-cols-3">
        {pokemonIdsGen.map((id) => (
          <Pokemon
            key={id}
            pokemonId={id}
          />
        ))}
      </div>
    </div>
  );
}
