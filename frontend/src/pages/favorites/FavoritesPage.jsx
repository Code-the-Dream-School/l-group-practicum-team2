import AnimalCard from "../../components/animals/AnimalCard";
import { mockAnimals } from "../../constants/animals";
import { getFavorites } from "../../services/favorites";
import ErrorMessage from "../../components/ErrorMessage";

function FavoritesPage() {
  const favoriteIds = getFavorites();
  const favoriteAnimals = mockAnimals.filter((animal) =>
    favoriteIds.includes(String(animal.id))
  );

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
