import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";

function buildCardId(setNum, cardNum) {
  return `OP${String(setNum).padStart(2, "0")}-${String(cardNum).padStart(3, "0")}`;
}

function ListPage({ toggleFavorite, isFavorite }) {
  const [cards, setCards] = useState([]);        // cartes de base
  const [searchResults, setSearchResults] = useState([]); // résultats API
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  // Charger les 20 cartes de base
  useEffect(() => {
    const promises = Array.from({ length: 20 }, (_, i) => {
      const cardId = buildCardId(1, i + 1);
      return fetch(`https://www.optcgapi.com/api/sets/card/${cardId}/`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => (data ? data[0] : null))
        .catch(() => null);
    });

    Promise.all(promises).then((results) => {
      setCards(results.filter(Boolean));
      setLoading(false);
    });
  }, []);

  // Recherche via API filtered
  useEffect(() => {
    if (search.length === 0) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    fetch(`https://www.optcgapi.com/api/sets/filtered/?card_name=${encodeURIComponent(search)}`)
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setSearchResults(data))
      .finally(() => setSearching(false));
  }, [search]);

  if (loading) return <div className="status">Chargement des cartes...</div>;

  const displayCards = search.length > 0 ? searchResults : cards;

  return (
    <main className="page">
      <input
        type="text"
        placeholder="Rechercher une carte..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {searching && <div className="status">Recherche en cours...</div>}
      <div className="card-grid">
        {displayCards.map((card) => (
          <CardItem
            key={card.card_set_id}
            card={card}
            isFavorite={isFavorite(card)}
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

export default ListPage;