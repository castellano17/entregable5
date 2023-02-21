export const paginationLogic = (pokemonFilter, currentPage, pokemonPerPage) => {
  //Cantidad de pokemons por pagina
  // const pokemonPerPage = 12;

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
