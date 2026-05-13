import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/Home';
import ListPage from './components/ListPage';
import FavoritesPage from './components/PageFavoris.jsx';
import CardDetail from './components/CardDetail';
import './App.css'

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('optcg-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('optcg-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (card) => {
    setFavorites(prev =>
      prev.find(c => c.card_set_id === card.card_set_id)
        ? prev.filter(c => c.card_set_id !== card.card_set_id)
        : [...prev, card]
    );
  };

  const isFavorite = (card) =>
    favorites.some(c => c.card_set_id === card.card_set_id);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/list"
          element={<ListPage toggleFavorite={toggleFavorite} isFavorite={isFavorite} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route path="/card/:setNum/:cardNum" element={<CardDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;