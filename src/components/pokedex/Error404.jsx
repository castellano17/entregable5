import React from "react";
import { Link } from "react-router-dom";
import "./styles/Error404.css";

const Error404 = () => {
  return (
    <div className="error">
      <div className="error__section">
        <h1>404</h1>
        <p>Lo sentimos, no hemos podido encontrar lo que estabas buscando.</p>
        <Link to="/">
          <button className="back-to-home-btn">Ir a inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
