import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ShelterInfo from "../components/shelters/ShelterInfo";
import { useAnimal } from "../contexts/AnimalContext";
import { useFavorite } from "../contexts/FavoriteContext";
import { formatLabel } from "../utils/formatLabel";
import NotFound from "./NotFound";
import InquiryButton from "../components/inquiries/InquiryButton";
import { formatAnimalAge } from "../utils/formatAnimalAge";
import AnimalListPlaceholder from '../components/placeholders/AnimalListPlaceholder'
function normalizeAnimal(data) {
  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    species: data.species,
    breed: data.breed,
    age_years: data.age_years,
    age_category: data.age_category,
    size: data.size,
    temperament: Array.isArray(data.temperament)
      ? data.temperament
      : data.temperament
        ? [data.temperament]
        : [],
    description: data.description,
    special_needs: Boolean(data.special_needs),
    photo_url: data.photo_url,
    shelter_id: data.shelter_id || null,
    shelter_name: data.shelter_name || data.shelter?.name || null,
    shelter_city: data.shelter_city || data.shelter?.city || null,
    shelter_email: data.shelter_email || data.shelter?.contact_email || null,
    shelter_phone: data.shelter_phone || data.shelter?.phone || null,
    status: data.status || null,
  };
}

export default function AnimalDetail() {
  const { getAnimalById, loading } = useAnimal();
  const { id } = useParams();
  const { requestToggleFavorite, isFavorite } = useFavorite();

  const [animal, setAnimal] = useState(undefined);

  useEffect(() => {
    const loadAnimal = async () => {
      try {
        const data = await getAnimalById(id);
        setAnimal(normalizeAnimal(data));
      } catch (error) {
        console.error("Error loading animal details:", error);
        setAnimal(null);
      }
    };
    loadAnimal();
  }, [getAnimalById, id]);

  const handleSave = () => {
    requestToggleFavorite(animal.id);
  };

  if(singleAnimaLoading || !animal){
    return <AnimalPlaceholder />

  }

  if (!loading && !animal) {
    return <NotFound />;
  }

  const isSenior = animal.age_category?.toUpperCase() === "SENIOR";
  const isAdopted = animal.status?.toUpperCase() === "ADOPTED";

  return (
    <main className="detail-page">
      <title>Animal Details - PawMatch</title>
      <div className="detail-back-link">
        <Link to="/">← Back to animals list</Link>
      </div>

      <section className="detail-layout">
        <div className="detail-image-column">
          <img
            src={animal.photo_url}
            alt={animal.name}
            className="detail-image"
          />
        </div>

        <div className="detail-content-column">
          <div className="detail-header-row">
            <div>
              <h1>{animal.name}</h1>
              <p className="detail-subtitle">
                {formatLabel(animal.species)} • {animal.breed}
              </p>
            </div>

            <div className="detail-badges">
              {animal.special_needs && (
                <span className="detail-badge warning">Special Needs</span>
              )}

              {isSenior && (
                <span className="detail-badge secondary">Senior</span>
              )}

              {isAdopted && (
                <span className="detail-badge adopted">Adopted</span>
              )}
            </div>
          </div>

          <div className="detail-meta-grid">
            <div className="detail-meta-card">
              <span className="detail-label">Age</span>
              <strong>{formatAnimalAge(animal.age_years)}</strong>
            </div>

            <div className="detail-meta-card">
              <span className="detail-label">Size</span>
              <strong>{formatLabel(animal.size)}</strong>
            </div>

            <div className="detail-meta-card">
              <span className="detail-label">Species</span>
              <strong>{formatLabel(animal.species)}</strong>
            </div>

            <div className="detail-meta-card">
              <span className="detail-label">Breed</span>
              <strong>{animal.breed}</strong>
            </div>
          </div>

          <section className="detail-section">
            <h2>Temperament</h2>

            <div className="tags">
              {animal.temperament?.length ? (
                animal.temperament.map((item) => (
                  <span key={item}>{formatLabel(item)}</span>
                ))
              ) : (
                <span>No temperament info</span>
              )}
            </div>
          </section>

          <section className="detail-section">
            <h2>Description</h2>
            <p>{animal.description || "No description available."}</p>
          </section>

          <ShelterInfo
            shelter_name={animal.shelter_name}
            shelter_city={animal.shelter_city}
            shelter_email={animal.shelter_email}
            shelter_phone={animal.shelter_phone}
          />

              
          <div className="detail-actions">
            <button
              type="button"
              className={`btn ${isFavorite(animal.id) ? "btn-primary" : "btn-secondary"}`}
              onClick={handleSave}
              aria-label={
                isFavorite(animal.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              {isFavorite(animal.id) ? "Saved" : "Save"}
            </button>

            <InquiryButton animalName={animal.name} animalId={animal.id} />
          </div>
        </div>
      </section>
    </main>
  );
}
