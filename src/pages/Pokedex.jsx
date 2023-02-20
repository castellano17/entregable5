import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../components/pokedex/PokemonCard";
import "./styles/Pokedex.css";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeSelect = (e) => {
    setSelectType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const paginationLogic = () => {
    //Cantidad de pokemons por pagina
    const pokemonPerPage = 12;

    //pokemos que se van a mostrar en la página actual
    const sliceStart = (currentPage - 1) * pokemonPerPage;
    const sliceEnd = sliceStart + pokemonPerPage;
    const pokemonInPage = pokemonFilter.slice(sliceStart, sliceEnd);

    //Última página
    const lastPage = Math.ceil(pokemonFilter.length / pokemonPerPage) || 1;

    //Bloque actual
    const pagesPerBlock = 5;
    const actualBlock = Math.ceil(currentPage / pagesPerBlock);

    //Páginas que se van a mostrar en el bloque actual
    const pagesInBlock = [];
    const minPage = actualBlock * pagesPerBlock - pagesPerBlock + 1;
    const maxPage = actualBlock * pagesPerBlock;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return {
      pagesInBlock,
      lastPage,
      pokemonInPage,
    };
  };

  const { pagesInBlock, lastPage, pokemonInPage } = paginationLogic();

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
      selectType ? `type/${selectType}/` : "pokemon/?limit=20"
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
    <main className="pokedex">
      <p className="pokedex__title">
        <span className="pokedex__title-name">Welcome {nameTrainer},</span> here
        you can find information about of your favorite pokemon?{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="pokemonName"
            placeholder="Search your pokemon"
          />
          <button>Search</button>
        </div>
        <select onChange={handleChangeSelect}>
          <option value="">All</option>
          {types.map((type) => (
            <option key={type.url}>{type.name}</option>
          ))}
        </select>
      </form>
      <section className="pokedex__Card">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
      <section>
        <ul>
          <li onClick={handlePreviousPage}>{"<<"}</li>
          <li onClick={() => setCurrentPage(1)}>... </li>
          {pagesInBlock.map((page) => (
            <li onClick={() => setCurrentPage(page)} key={page}>
              {page}
            </li>
          ))}
          <li onClick={() => setCurrentPage(lastPage)}>... </li>
          <li onClick={handleNextPage}>{">>"}</li>
        </ul>
      </section>
    </main>
  );
};

export default Pokedex;
