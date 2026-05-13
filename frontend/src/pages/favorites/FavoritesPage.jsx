import AnimalCard from "../../components/animals/AnimalCard";
import { mockAnimals } from "../../constants/animals";
import { fetchFavorites } from "../../services/favorites";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const [favoriteAnimals, setFavoriteAnimals] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setFavoriteAnimals(await fetchFavorites());
      setFavoriteAnimals(
        favoriteAnimals.filter((animal) =>
          favoriteIds.includes(String(animal.id))
        )
      );
    }
    fetchData();
  }, []);

  return (
    <main className="app">
      <h1>Favorites</h1>

      {favoriteAnimals.length === 0 ? (
        <p>You haven't saved any animals yet</p>
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
