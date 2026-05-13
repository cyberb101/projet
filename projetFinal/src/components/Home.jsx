import './Home.css'

function HomePage() {
    return (
      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">OPTCG Collection</h1>
            <p className="hero-subtitle">
              Explorez les cartes du jeu de cartes One Piece TCG et créez votre collection.
            </p>
            <a href="/list" className="hero-btn">Voir les cartes</a>
          </div>
        </section>
      </main>
    );
  }
  
  export default HomePage;