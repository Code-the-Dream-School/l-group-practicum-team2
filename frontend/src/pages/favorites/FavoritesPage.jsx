import { Button, Card } from "react-bootstrap";
import AnimalCard from "../../components/animals/AnimalCard";
import AnimalListPlaceholder from "../../components/placeholders/AnimalListPlaceholder";
import { useFavorite } from "../../contexts/FavoriteContext";
import { Alert } from "react-bootstrap";

function FavoritesPage() {
  const { favoriteAnimals, favoritesLoading } = useFavorite();

  if (favoritesLoading) {
    return <AnimalListPlaceholder />;
  }
  if(favoriteAnimals.length === 0){
    return (
      <main className="app">
        <h1>Favorites</h1>
        <Card className="p-4 text-center">
          <h3>No favorites yet</h3>

          <p className="text-muted">
            When you save animals as favorites, they will appear here.
          </p>
          <Button onClick={() => navigate("/")}>Browse Animals</Button>
        </Card>
      </main>
    );
  }
  return (
    <main className="app">
      <h1>Favorites</h1>
        <div className="animals-grid">
          {favoriteAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} isFavorite={true} />
          ))}
        </div>
    </main>
  );
}

export default FavoritesPage;
