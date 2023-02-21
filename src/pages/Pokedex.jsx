import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/pokedex/Loader";
import Pagination from "../components/pokedex/Pagination";
import PokemonCard from "../components/pokedex/PokemonCard";
import { paginationLogic } from "../utils/Paginations";
import "./styles/Pokedex.css";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);

  const handleChangePerPage = (e) => {
    setPokemonPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleChangeSelect = (e) => {
    setSelectType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const { pagesInBlock, lastPage, pokemonInPage } = paginationLogic(
    pokemonFilter,
    currentPage,
    pokemonPerPage
  );

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    if (newPage > lastPage) {
      setCurrentPage(1);
    } else setCurrentPage(newPage);
  };

  const handlePreviousPage = () => {
    const newPage = currentPage - 1;
    if (newPage < 1) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${
      selectType ? `type/${selectType}/` : "pokemon/?limit=1154"
    }`;
    axios
      .get(URL)
      .then((res) => {
        if (selectType) {
          const pokemonByType = res.data.pokemon.map((pokemon) => {
            return {
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url,
            };
          });
          setPokemons(pokemonByType);
        } else {
          setPokemons(res.data.results);
        }
      })

      .catch((err) => console.log(err));
  }, [selectType]);

  useEffect(() => {
    const pokemonByName = pokemons.filter((pokemon) =>
      pokemon.name.includes(pokemonName.toLocaleLowerCase())
    );
    setPokemonFilter(pokemonByName);
  }, [pokemonName, pokemons]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons]);

  const nameTrainer = useSelector((store) => store.nameTrainer);
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
