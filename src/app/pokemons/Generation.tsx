import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

export default function Generation({ start, end }: { start: number; end: number }) {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonIdsGen, setPokemonIdsGen] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollable(document.body.offsetHeight > window.innerHeight);
      if (
        !isScrollable &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        currentPage * itemsPerPage < end
      ) {
        setIsLoading(true);
      } else {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const handleResize = () => {
      setIsScrollable(document.body.offsetHeight > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize(); // Check initial scrollable state

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPage, end, isScrollable]);

  useEffect(() => {
    const generatePokemonIds = () => {
      const ids = [];
      for (let id = start; id <= end; id++) {
        ids.push(id);
      }
      setPokemonIdsGen(ids);
    };

    generatePokemonIds();
  }, [start, end]);

  useEffect(() => {
    if (!isLoading && !isScrollable) {
      setIsLoading(true);
    }
  }, [isLoading, isScrollable]);

  useEffect(() => {
    if (isLoading) {
      const loadMorePokemons = () => {
        const remainingPokemons = pokemonIdsGen.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage,
        );
        if (remainingPokemons.length > 0 && !isScrollable) {
          // Simulating an API call delay
          setTimeout(() => {
            setCurrentPage((prevPage) => prevPage + 1);
          }, 500);
        } else {
          setIsLoading(false);
        }
      };

      loadMorePokemons();
    }
  }, [currentPage, isLoading, itemsPerPage, pokemonIdsGen, isScrollable]);

  return (
    <div className="mt-16">
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-[800px]:grid-cols-1">
        {pokemonIdsGen.slice(0, currentPage * itemsPerPage).map((id) => (
          <Pokemon
            key={id}
            pokemonId={id}
          />
        ))}
      </div>
      {isLoading && <Loading />}
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}
