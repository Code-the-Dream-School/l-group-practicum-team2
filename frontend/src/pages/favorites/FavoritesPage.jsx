import AnimalCard from "../../components/animals/AnimalCard";
import { mockAnimals } from "../../constants/animals";
import { fetchFavorites } from "../../services/favorites";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import { useFavorite } from "../../contexts/FavoriteContext";
function FavoritesPage() {
  
  const { favorites: favoriteAnimals } = useFavorite();
console.log(favoriteAnimals)
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
