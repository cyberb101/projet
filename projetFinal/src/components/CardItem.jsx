function CardItem({ card, isFavorite, onToggle, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={card.card_image} alt={card.card_name} className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{card.card_name}</h3>
        <p className="card-info">{card.set_name} · {card.rarity}</p>
        <p className="card-price">${Number(card.market_price).toFixed(2)}</p>
        <button
          className={`fav-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {isFavorite ? "★ Retirer" : "☆ Favoris"}
        </button>
      </div>
    </div>
  );
}

export default CardItem;