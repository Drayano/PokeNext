export default function GenerationSelector({
  selectedGeneration,
  handleGenerationClick,
}: {
  selectedGeneration: number;
  handleGenerationClick: (generation: number) => void;
}) {
  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-5 max-[800px]:grid-cols-3 max-[430px]:grid-cols-2 max-[280px]:grid-cols-1">
      {generations.map((generation) => (
        <div
          key={generation}
          className={`text-center text-5xl max-lg:text-3xl max-sm:text-2xl max-[430px]:text-xl mx-3 mb-4 rounded-lg border border-gray-300 p-4 cursor-pointer ${
            selectedGeneration === generation ? "text-red-500" : "text-white"
          }`}
          onClick={() => handleGenerationClick(generation)}
        >
          Gen {generation}
        </div>
      ))}
    </div>
  );
}
