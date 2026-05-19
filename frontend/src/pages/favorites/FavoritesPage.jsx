import { useEffect, useState } from "react";
import AnimalCard from "../../components/animals/AnimalCard";
import ErrorMessage from "../../components/ErrorMessage";
import { fetchFavorites } from "../../services/favorites";

function FavoritesPage() {
  const [favoriteAnimals, setFavoriteAnimals] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setFavoriteAnimals(await fetchFavorites());
    }
    fetchData();
  }, []);

  return (
    <main className="app">
      <h1>Favorites</h1>

      {favoriteAnimals.length === 0 ? (
        <ErrorMessage message="You haven't saved any animals yet." />
      ) : (
        <div className="animals-grid">
          {favoriteAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} isFavorite={true} />
          ))}
        </div>
      )}
    </main>
  );
}

export default FavoritesPage;
