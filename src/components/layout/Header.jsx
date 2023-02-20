import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/slices/nameTrainer.slice";

const Header = () => {
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    dispatch(logOut());
  };
  return (
    <header>
      <div>
        <div>
          <img src="/images/pokedex.png" alt="pokedex" />
        </div>
      </div>
      <div>
        <div>
          <button onClick={handleClickLogOut}>Log out</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
