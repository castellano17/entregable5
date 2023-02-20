import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainerGlobal } from "../store/slices/nameTrainer.slice";
import "./styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
    dispatch(setNameTrainerGlobal(nameTrainer));
  };
  return (
    <main className="home">
      <section className="home__intro">
        <div className="home__img">
          <img src="/images/pokedex.png" alt="Pokedex" />
        </div>
        <h2 className="home__welcome">Hello trainer!</h2>
        <p className="home__start">Give me your name to start!</p>
        <form className="home__form" onSubmit={handleSubmit}>
          <input
            className="home__input"
            required
            id="nameTrainer"
            placeholder="your name..."
            type="text"
          />
          <button>
            <i className="home__btn bx bxl-telegram"></i>
          </button>
        </form>
      </section>
    </main>
  );
};

export default Home;
