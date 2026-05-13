import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function buildCardId(setNum, cardNum) {
  const set = String(setNum).padStart(2, "0");
  const num = String(cardNum).padStart(3, "0");
  return `OP${set}-${num}`;
}

function CardDetail() {
  const { setNum, cardNum } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cardId = buildCardId(setNum, cardNum);

    fetch(`https://optcgapi.com/api/sets/card/${cardId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Carte introuvable");
        return res.json();
      })
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [setNum, cardNum]);

  if (loading) {
    return <div className="status">Chargement de la carte...</div>;
  }

  if (error) {
    return <div className="status error">{error}</div>;
  }

  if (cards.length === 0) {
    return <div className="status error">Aucune carte trouvée.</div>;
  }

  // on affiche la version normale (index 0) par défaut
  const card = cards[0];

  return (
    <main className="detail-page">
      <div className="detail-card">
        <img
          src={card.card_image}
          alt={card.card_name}
          className="detail-image"
        />
        <div className="detail-info">
          <h2>{card.card_name}</h2>
          <p><span className="label">Set :</span> {card.set_name}</p>
          <p><span className="label">Rareté :</span> {card.rarity}</p>
          <p><span className="label">Type :</span> {card.card_type}</p>
          <p><span className="label">Couleur :</span> {card.card_color}</p>
          <p><span className="label">Puissance :</span> {card.card_power ?? "N/A"}</p>
          <p><span className="label">Attribut :</span> {card.attribute ?? "N/A"}</p>
          <p><span className="label">Effet :</span> {card.card_text}</p>
          <p><span className="label">Prix marché :</span> ${Number(card.market_price).toFixed(2)}</p>
        </div>
      </div>
      {cards.length > 1 && (
        <div className="parallel-section">
          <h3>Version parallèle</h3>
          <div className="detail-card">
            <img
              src={cards[1].card_image}
              alt={cards[1].card_name}
              className="detail-image"
            />
            <div className="detail-info">
              <h2>{cards[1].card_name}</h2>
              <p><span className="label">Prix marché :</span> ${Number(cards[1].market_price).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CardDetail;