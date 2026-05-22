import AnimalCard from "../../components/animals/AnimalCard";
import { useFavorite } from "../../contexts/FavoriteContext";
import ErrorMessage from "../../components/ErrorMessage";

function FavoritesPage() {
  const { favoriteAnimals } = useFavorite();

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
