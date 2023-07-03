export default function GenerationSelector({
  selectedGeneration,
  handleGenerationClick,
}: {
  selectedGeneration: number;
  handleGenerationClick: (generation: number) => void;
}) {
  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-wrap justify-center mb-10">
      {generations.map((generation) => (
        <div
          key={generation}
          className={`text-center text-5xl mx-3 mb-4 ${
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
