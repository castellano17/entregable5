import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedHome from "./components/ProtectedHome";
import Error404 from "./components/pokedex/Error404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedHome />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<Pokemon />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
