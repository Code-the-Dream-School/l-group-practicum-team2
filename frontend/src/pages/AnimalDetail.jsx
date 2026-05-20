import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { mockAnimals } from "../constants/animals";
import { formatLabel } from "../utils/formatLabel";
import NotFound from "./NotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import InquiryModal from "../components/inquiries/InquiryModal";
import ShelterInfo from "../components/shelters/ShelterInfo";

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
  };
}

function isUserLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  // Inquiry state
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

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
            setError(true);
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
        console.error("Failed to fetch animal:", error);

        const fallbackAnimal = mockAnimals.find(
          (item) => String(item.id) === String(id)
        );

        if (!ignore) {
          if (fallbackAnimal) {
            setAnimal(normalizeAnimal(fallbackAnimal));
          } else {
            setNotFound(true);
            setAnimal(null);
            setError(true);
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

  const handleSave = () => {
    if (!isUserLoggedIn()) {
      navigate("/login");
      return;
    }
    alert("Save action will be connected later.");
  };

  const handleInquire = () => {
    if (!isUserLoggedIn()) {
      navigate("/login");
      return;
    }
    setShowInquiryModal(true);
  };

  const handleInquirySuccess = () => {
    setShowInquiryModal(false);
    setInquirySent(true);
    setSuccessMessage(
      "Your inquiry has been sent! The shelter will contact you soon."
    );

    // Auto-hide toast after 5s
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    setNotFound(false);
    setAnimal(null);
  };

  if (loading) {
    return (
      <main className="detail-page">
        <LoadingSpinner message="Loading animal details..." />
      </main>
    );
  }

  if (notFound || !animal) {
    return <NotFound />;
  }

  const isSenior = animal.age_category === "senior";

  return (
    <main className="detail-page">
      {successMessage && (
        <div
          className="inquiry-toast inquiry-toast-success"
          role="status"
          aria-live="polite"
        >
          {successMessage}
        </div>
      )}

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

          <ShelterInfo
            shelter_name={animal.shelter_name}
            shelter_city={animal.shelter_city}
            shelter_email={animal.shelter_email}
            shelter_phone={animal.shelter_phone}
          />

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
              disabled={inquirySent}
            >
              {inquirySent ? "Inquiry sent ✓" : "I'm Interested"}
            </button>
          </div>
        </div>
      </section>
      {error && (
        <ErrorMessage
          message="Failed to load animal details."
          handleRetry={handleRetry}
        />
      )}

      <InquiryModal
        show={showInquiryModal}
        onHide={() => setShowInquiryModal(false)}
        animalId={animal.id}
        animalName={animal.name}
        onSuccess={handleInquirySuccess}
      />
    </main>
  );
}
