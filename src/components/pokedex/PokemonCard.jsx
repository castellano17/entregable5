import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemonUrl }) => {
    const [pokemon, setPokemon] = useState()

    const navigate = useNavigate()

    const handleClickPokemon = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }

    useEffect(() => {
        axios.get(pokemonUrl)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])
    return (
        <article onClick={handleClickPokemon}>
            <section></section>
            <section>
                <div><img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" /></div>
                <h3>{pokemon?.name}</h3>
                <h4>{pokemon?.types[0].type.name}  {pokemon?.types[1] && `/ ${pokemon?.types[1].type.name}`} </h4>
                <h6>Type</h6>
                <hr />
                <section>
                    {
                        pokemon?.stats.map(stat => (
                            <div key={stat.stat.url}>
                                <h5>{stat.stat.name}</h5>
                                <h5>{stat.base_stat}</h5>

                            </div>
                        ))
                    }
                </section>
            </section>
        </article>
    )
}

export default PokemonCard