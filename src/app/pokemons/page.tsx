"use client";

import { useState } from "react";

import Generation from "./Generation";
import GenerationSelector from "./GenerationSelector";

function getGenerationStart(gen: number) {
  switch (gen) {
    case 1:
      return 1;
    case 2:
      return 152;
    case 3:
      return 252;
    case 4:
      return 387;
    case 5:
      return 494;
    case 6:
      return 650;
    case 7:
      return 722;
    case 8:
      return 810;
    case 9:
      return 906;
    default:
      return 1;
  }
}

function getGenerationEnd(gen: number) {
  switch (gen) {
    case 1:
      return 151;
    case 2:
      return 251;
    case 3:
      return 386;
    case 4:
      return 493;
    case 5:
      return 649;
    case 6:
      return 721;
    case 7:
      return 809;
    case 8:
      return 905;
    case 9:
      return 1010;
    default:
      return 1;
  }
}

export default function Pokemons() {
  const [selectedGeneration, setSelectedGeneration] = useState(1);

  const handleGenerationClick = (generation: number) => {
    setSelectedGeneration(generation);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <div className="text-center text-7xl mb-8 max-sm:text-5xl">Pokemons</div>

      <GenerationSelector
        selectedGeneration={selectedGeneration}
        handleGenerationClick={handleGenerationClick}
      />

      <Generation
        key={selectedGeneration}
        start={getGenerationStart(selectedGeneration)}
        end={getGenerationEnd(selectedGeneration)}
      />
    </main>
  );
}
