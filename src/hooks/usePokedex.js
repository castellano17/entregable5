import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { paginationLogic } from "../utils/Paginations";

const usePokedex = () => {
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

  const { pagesInBlock, lastPage, pokemonInPage } = useMemo(() => {
    return paginationLogic(pokemonFilter, currentPage, pokemonPerPage);
  }, [pokemonFilter, currentPage, pokemonPerPage]);

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${
      selectType ? `type/${selectType}/` : "pokemon/?limit=1279"
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

  return {
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
  };
};

export default usePokedex;
