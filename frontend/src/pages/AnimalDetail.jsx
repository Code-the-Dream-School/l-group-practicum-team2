import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockAnimals } from "../constants/animals";
import { formatLabel } from "../utils/formatLabel";
import NotFound from "./NotFound";

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
    shelter: {
      name: data.shelter?.name || "",
      city: data.shelter?.city || "",
      contact_email: data.shelter?.contact_email || "",
    },
  };
}

export default function AnimalDetail() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadAnimal() {
      setLoading(true);
      setNotFound(false);

      try {
        const response = await fetch(`/api/animals/${id}`);

        if (response.status === 404) {
          if (!ignore) {
            setNotFound(true);
            setAnimal(null);
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch animal");
        }

        const data = await response.json();

        if (!ignore) {
          setAnimal(normalizeAnimal(data));
        }
      } catch (error) {
        const fallbackAnimal = mockAnimals.find(
          (item) => String(item.id) === String(id)
        );

        if (!ignore) {
          if (fallbackAnimal) {
            setAnimal(fallbackAnimal);
          } else {
            setNotFound(true);
            setAnimal(null);
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadAnimal();

    return () => {
      ignore = true;
    };
  }, [id]);

  const isAuthenticated = false;

  const handleSave = () => {
    if (!isAuthenticated) {
      alert("Please log in to save this animal to favorites.");
      return;
    }

    alert("Save action will be connected later.");
  };

  const handleInquire = () => {
    if (!isAuthenticated) {
      alert("Please log in to send an inquiry.");
      return;
    }

    alert("Inquiry modal will be connected later.");
  };

  if (loading) {
    return (
      <main className="detail-page">
        <p>Loading animal details...</p>
      </main>
    );
  }

  if (notFound || !animal) {
    return <NotFound />;
  }

  const isSenior = animal.age_category === "senior";

  return (
    <main className="detail-page">
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
            </div>
          </div>

          <div className="detail-meta-grid">
            <div className="detail-meta-card">
              <span className="detail-label">Age</span>
              <strong>{animal.age_years} yrs</strong>
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

          <section className="detail-section shelter-card">
            <h2>Shelter information</h2>
            <p>
              <strong>Name:</strong> {animal.shelter?.name || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {animal.shelter?.city || "N/A"}
            </p>
            <p>
              <strong>Contact email:</strong>{" "}
              {animal.shelter?.contact_email ? (
                <a href={`mailto:${animal.shelter.contact_email}`}>
                  {animal.shelter.contact_email}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </section>

          <div className="detail-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleInquire}
            >
              Inquire
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
