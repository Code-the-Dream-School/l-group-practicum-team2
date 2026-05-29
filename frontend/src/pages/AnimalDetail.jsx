import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InquiryModal from "../components/inquiries/InquiryModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ShelterInfo from "../components/shelters/ShelterInfo";
import { useAnimal } from "../contexts/AnimalContext";
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
    shelter_id: data.shelter_id || null,
    shelter_name: data.shelter_name || data.shelter?.name || null,
    shelter_city: data.shelter_city || data.shelter?.city || null,
    shelter_email: data.shelter_email || data.shelter?.contact_email || null,
    shelter_phone: data.shelter_phone || data.shelter?.phone || null,
    status: data.status || null,
  };
}

function isUserLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

export default function AnimalDetail() {
  const { getAnimalById, loading } = useAnimal();
  const { id } = useParams();
  const navigate = useNavigate();

  // Inquiry state
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const animal = normalizeAnimal(getAnimalById(id));

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

  if (loading) {
    return (
      <main className="detail-page">
        <LoadingSpinner message="Loading animal details..." />
      </main>
    );
  }

  if (!animal) {
    return <NotFound />;
  }

  const isSenior = animal.age_category?.toUpperCase() === "SENIOR";
  const isAdopted = animal.status?.toUpperCase() === "ADOPTED";

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

              {isAdopted && (
                <span className="detail-badge adopted">Adopted</span>
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
              disabled={inquirySent || isAdopted}
            >
              {inquirySent ? "Inquiry sent ✓" : "I'm Interested"}
            </button>
          </div>
        </div>
      </section>

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
