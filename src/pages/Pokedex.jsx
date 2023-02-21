import { useSelector } from "react-redux";
import Loader from "../components/pokedex/Loader";
import Pagination from "../components/pokedex/Pagination";
import PokemonCard from "../components/pokedex/PokemonCard";
import usePokedex from "../hooks/usePokedex";

import "./styles/Pokedex.css";

const Pokedex = () => {
  const nameTrainer = useSelector((store) => store.nameTrainer);
  const {
    handleSubmit,
    handleChangePerPage,
    handleChangeSelect,
    types,
    pokemons,
    pokemonPerPage,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    pagesInBlock,
    currentPage,
    lastPage,
    pokemonInPage,
  } = usePokedex();

  return (
    <>
      {pokemons ? (
        <main className="pokedex">
          <p className="pokedex__title">
            <span className="pokedex__title-name">Welcome {nameTrainer},</span>{" "}
            here you can find information about of your favorite pokemon?{" "}
          </p>
          <form className="pokedex__form" onSubmit={handleSubmit}>
            <div>
              <input
                className="pokedex__input"
                type="text"
                id="pokemonName"
                placeholder="Search your pokemon"
              />
              <button className="pokedex__button">Search</button>
            </div>
            <select className="pokedex__select" onChange={handleChangeSelect}>
              <option value="">All</option>
              {types.map((type) => (
                <option key={type.url}>{type.name}</option>
              ))}
            </select>

            <select
              className="pokedex__select"
              onChange={handleChangePerPage}
              value={pokemonPerPage}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="20">20</option>
            </select>
          </form>

          <Pagination
            handlePreviousPage={handlePreviousPage}
            setCurrentPage={setCurrentPage}
            handleNextPage={handleNextPage}
            pagesInBlock={pagesInBlock}
            currentPage={currentPage}
            lastPage={lastPage}
          />

          <section className="pokedex__Card">
            {pokemonInPage.map((pokemon) => (
              <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
            ))}
          </section>

          <Pagination
            handlePreviousPage={handlePreviousPage}
            setCurrentPage={setCurrentPage}
            handleNextPage={handleNextPage}
            pagesInBlock={pagesInBlock}
            currentPage={currentPage}
            lastPage={lastPage}
          />
          {/* <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <i className="bx bx-up-arrow-circle"></i>
        </button> */}
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Pokedex;
