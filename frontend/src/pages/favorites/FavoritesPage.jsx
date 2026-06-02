import { Button, Card } from "react-bootstrap";
import AnimalCard from "../../components/animals/AnimalCard";
import { useFavorite } from "../../contexts/FavoriteContext";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
  const navigate = useNavigate();
  const { favoriteAnimals } = useFavorite();

  return (
    <main className="app">
      <h1>Favorites</h1>
      <title>My Favorites - PawMatch</title>

      {favoriteAnimals.length === 0 ? (
        <Card className="p-4 text-center">
          <h3>No favorites yet</h3>

          <p className="text-muted">
            When you save animals as favorites, they will appear here.
          </p>
          <Button onClick={() => navigate("/")}>Browse Animals</Button>
        </Card>
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
