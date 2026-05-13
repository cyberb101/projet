import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link>
      <Link to="/list">Cartes</Link>
      <Link to="/favorites">Favoris</Link>
    </nav>
  );
}

export default Navbar;