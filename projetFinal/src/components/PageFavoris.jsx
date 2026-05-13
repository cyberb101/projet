import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";

function FavoritesPage({ favorites, toggleFavorite }) {
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <main className="page">
        <p className="status">Aucun favori pour l'instant.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="card-grid">
        {favorites.map((card) => (
          <CardItem
            key={card.card_set_id}
            card={card}
            isFavorite={true}
            onToggle={() => toggleFavorite(card)}
            onClick={() => {
              const [set, num] = card.card_set_id.replace("OP", "").split("-");
              navigate(`/card/${parseInt(set)}/${parseInt(num)}`);
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default FavoritesPage;