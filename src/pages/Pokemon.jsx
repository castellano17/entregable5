import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Pokemon.css";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

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
      <section className="pokemon">
        <section>
          <div>
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt="Pokemon"
            />
          </div>
        </section>
      </section>
      {/*Body */}
      <section>
        <h2># {pokemon?.id}</h2>
        <h2>{pokemon?.name}</h2>
        <div>
          <div>
            <h5>Weight</h5>
            <h4>{pokemon?.weight}</h4>
          </div>
          <div>
            <h5>Height</h5>
            <h4>{pokemon?.height}</h4>
          </div>
        </div>

        <div>
          <div>
            <h3>Type</h3>
            <div>
              {pokemon?.types.map((type) => (
                <div key={type.type.name}>
                  <span>{type.type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>Abilities</h3>
            <div>
              {pokemon?.abilities.map((ability) => (
                <div key={ability.ability.name}>
                  <span>{ability.ability.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* State */}
        <section>
          <h2>Stast</h2>
          <section>
            {pokemon?.stats.map((stat) => (
              <article key={stat.stat.name}>
                <div>
                  <h4>{stat.stat.name}</h4>
                  <h5>{stat.base_stat}/255</h5>
                </div>
                <div>
                  <div>
                    <div></div>
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
