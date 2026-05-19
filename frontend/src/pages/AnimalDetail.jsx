import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InquiryModal from "../components/inquiries/InquiryModal";
import { fetchAnimalById } from "../services/animals";
import { formatLabel } from "../utils/formatLabel";
import NotFound from "./NotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import InquiryModal from "../components/inquiries/InquiryModal";

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
    //  temperament 
    temperament: data.temperament || "",
    description: data.description,
    special_needs: data.special_needs,
    photo_url: data.photo_url,
    status: data.status,
    shelter: data.shelter || null,
  };
}

//  Display-only helper:
function temperamentToTags(temperament) {
  if (!temperament || typeof temperament !== "string") return [];
  return temperament
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  // Inquiry state
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAnimal() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAnimalById(id);
        if (cancelled) return;
        setAnimal(normalizeAnimal(data));
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load animal");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAnimal();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!animal) return <NotFound />;

 
  const temperamentTags = temperamentToTags(animal.temperament);

  return (
    <main className="animal-detail">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="animal-detail-card">
        <img
          src={animal.photo_url}
          alt={animal.name}
          className="animal-detail-image"
        />

        <div className="animal-detail-info">
          <h1>{animal.name}</h1>
          <p className="breed">{animal.breed}</p>

          <div className="animal-meta">
            <span>{formatLabel(animal.species)}</span>
            <span>{formatLabel(animal.size)}</span>
            <span>{formatLabel(animal.age_category)}</span>
            <span>{animal.age_years} yrs</span>
          </div>

  
          {temperamentTags.length > 0 && (
            <div className="temperament-tags">
              {temperamentTags.map((tag) => (
                <span key={tag} className="temperament-tag">
                  {formatLabel(tag)}
                </span>
              ))}
            </div>
          )}

          <p className="description">{animal.description}</p>

          {animal.shelter && (
            <div className="shelter-info">
              <h3>Shelter</h3>
              <p>{animal.shelter.name}</p>
              <p>{animal.shelter.city}</p>
              <p>
                <a href={`mailto:${animal.shelter.contact_email}`}>
                  {animal.shelter.contact_email}
                </a>
              </p>
            </div>
          )}

          <button
            type="button"
            className="inquiry-btn"
            onClick={() => setShowInquiry(true)}
          >
            Send Inquiry
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

      {showInquiry && (
        <InquiryModal
          animal={animal}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </main>
  );
}

export default AnimalDetail;
