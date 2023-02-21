import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Pokemon.css";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  const getPorcentBar = (stat) => {
    const porcent = (stat * 100) / 255;
    return `${porcent}%`;
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <main>
      {/*parte superior */}
      <section>
        <section className="pokemon__header">
          <div className="pokemon__img">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt="Pokemon"
            />
          </div>
          <div
            className={`pokemon__back bg-lg-${pokemon?.types[0].type.name}`}
          ></div>
        </section>
      </section>
      {/*Body */}
      <section className="pokemon__body ">
        <h2 className="pokemon__id"># {pokemon?.id}</h2>
        <h2 className="pokemon__name">{pokemon?.name}</h2>
        <div className="pokemon__status">
          <div className="pokemon__weight">
            <h5 className="pokemon__span">Weight</h5>
            <h4 className="pokemon__span-id">{pokemon?.weight}</h4>
          </div>
          <div className="pokemon__height">
            <h5 className="pokemon__span">Height</h5>
            <h4 className="pokemon__span-id">{pokemon?.height}</h4>
          </div>
        </div>

        <div className="typeabilities">
          <div className="type__card">
            <h3 className="type__name">Type</h3>

            {pokemon?.types.map((type) => (
              <div
                key={type.type.name}
                className={`type__item ${type.type.name}`}
              >
                <span>{type.type.name}</span>
              </div>
            ))}
          </div>

          <div className="abilities__card">
            <h3 className="type__name">Abilities</h3>

            {pokemon?.abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className={`abilities__item ${ability.ability.name}`}
              >
                <span>{ability.ability.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* State */}
        <section className="pokemon__stats">
          <section className="pokemon__stats-info">
            <h2 className="pokemon__stats-title">Stast</h2>
            {pokemon?.stats.map((stat) => (
              <article className="pokemon__stat" key={stat.stat.name}>
                <div className="pokemon__stat-header">
                  <h4 className="pokemon__stat-name">{stat.stat.name}</h4>
                  <h5 className="pokemon__stat-value">{stat.base_stat}/255</h5>
                </div>
                <div className="pokemon__stat-bar">
                  <div className="pokemon__stat-barGray">
                    <div
                      className="pokemon__stat-barProgress"
                      style={{ width: getPorcentBar(stat.base_stat) }}
                    ></div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Pokemon;
