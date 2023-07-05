import { useEffect, useState } from "react";

// Define the list of type colors
const typeColors = [
  "bg-[#8bc34a]",
  "bg-[#555555]",
  "bg-[#7383b9]",
  "bg-[#f2cb55]",
  "bg-[#eba8c3]",
  "bg-[#eb4971]",
  "bg-[#ffa756]",
  "bg-[#748fc9]",
  "bg-[#6b57b8]",
  "bg-[#8bbe8a]",
  "bg-[#f78551]",
  "bg-[#91d8df]",
  "bg-[#b5b9c4]",
  "bg-[#9f6e97]",
  "bg-[#ff6568]",
  "bg-[#6f6e78]",
  "bg-[#4c91b2]",
  "bg-[#58abf6]",
];

export default function PokemonCardSkeleton() {
  const [randomColor, setRandomColor] = useState("");

  useEffect(() => {
    // Select a random type color from the list
    const randomIndex = Math.floor(Math.random() * typeColors.length);
    const color = typeColors[randomIndex];
    setRandomColor(color);
  }, []);

  return (
    <div
      className={`relative flex items-start justify-start px-48 max-[300px]:px-24  max-[400px]:px-32 py-10 mx-4 my-4 h-40 rounded-2xl bg-cover bg-center bg-no-repeat animate-pulse ${randomColor}`}
      style={{
        backgroundImage: `url("/img/pokeball-bg.svg")`,
      }}
    ></div>
  );
}
