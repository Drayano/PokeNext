export default function GenerationSelector({
  selectedGeneration,
  handleGenerationClick,
}: {
  selectedGeneration: number;
  handleGenerationClick: (generation: number) => void;
}) {
  return (
    <div className="flex justify-between mb-10">
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 1 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(1)}
      >
        Gen 1
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 2 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(2)}
      >
        Gen 2
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 3 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(3)}
      >
        Gen 3
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 4 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(4)}
      >
        Gen 4
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 5 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(5)}
      >
        Gen 5
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 6 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(6)}
      >
        Gen 6
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 7 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(7)}
      >
        Gen 7
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 8 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(8)}
      >
        Gen 8
      </div>
      <div
        className={`text-center text-5xl mx-4 ${
          selectedGeneration === 9 ? "text-red-500" : "text-white"
        }`}
        onClick={() => handleGenerationClick(9)}
      >
        Gen 9
      </div>
    </div>
  );
}
