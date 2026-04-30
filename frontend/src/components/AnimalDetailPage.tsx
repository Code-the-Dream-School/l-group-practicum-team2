import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Animal } from "../services/AnimalsService";
import { getAnimalById } from "../services/AnimalsService";
import "./AnimalDetailPage.css";

type RouteParams = {
  id: string;
};

type AppError = Error & {
  status?: number;
};

const formatValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatAge = (
  ageYears: number | null,
  ageCategory: string | null | undefined
): string => {
  if (ageYears !== null && ageYears !== undefined && !Number.isNaN(ageYears)) {
    return `${ageYears.toFixed(1)} years`;
  }

  if (ageCategory) {
    return formatValue(ageCategory);
  }

  return "—";
};

function AnimalDetailPage() {
  const { id } = useParams<keyof RouteParams>() as RouteParams;
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);

  const isAuthenticated = useMemo(() => {
    return Boolean(
      localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken")
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadAnimal = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setNotFound(false);

        const data = await getAnimalById(id);

        if (!isMounted) return;

        setAnimal(data);
      } catch (err) {
        if (!isMounted) return;

        const typedError = err as AppError;

        if (typedError.status === 404) {
          setNotFound(true);
        } else {
          setError(typedError.message || "Failed to load animal details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAnimal();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    alert("Favorite logic can be connected later");
  };

  const handleInquire = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setShowInquiryModal(true);
  };

  if (loading) {
    return (
      <div className="animal-detail-page">
        <div className="animal-detail-state">Loading animal details...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="animal-detail-page">
        <div className="animal-detail-state">
          <h1>404</h1>
          <p>Animal not found</p>
          <button
            onClick={() => navigate("/")}
            className="animal-detail-secondary-btn"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animal-detail-page">
        <div className="animal-detail-state">
          <h1>Error</h1>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="animal-detail-secondary-btn"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!animal) return null;

  const isSenior = animal.ageCategory.toLowerCase() === "senior";

  return (
    <div className="animal-detail-page">
      <div className="animal-detail-container">
        <button
          className="animal-detail-back-link"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="animal-detail-card">
          <div className="animal-detail-media">
            {animal.photoUrl ? (
              <img
                src={animal.photoUrl}
                alt={animal.name}
                className="animal-detail-image"
              />
            ) : (
              <div className="animal-detail-image-placeholder">
                No photo available
              </div>
            )}
          </div>

          <div className="animal-detail-content">
            <div className="animal-detail-header">
              <div>
                <h1 className="animal-detail-title">{animal.name}</h1>
                <p className="animal-detail-subtitle">
                  {formatValue(animal.species)}
                  {animal.breed ? ` • ${formatValue(animal.breed)}` : ""}
                </p>
              </div>

              <div className="animal-detail-badges">
                {animal.status && (
                  <span className="animal-detail-badge animal-detail-badge--status">
                    {formatValue(animal.status)}
                  </span>
                )}

                {animal.specialNeeds && (
                  <span className="animal-detail-badge animal-detail-badge--special">
                    Special Needs
                  </span>
                )}

                {isSenior && (
                  <span className="animal-detail-badge animal-detail-badge--senior">
                    Senior
                  </span>
                )}
              </div>
            </div>

            <div className="animal-detail-grid">
              <div className="animal-detail-field">
                <span className="animal-detail-label">Species</span>
                <span className="animal-detail-value">
                  {formatValue(animal.species)}
                </span>
              </div>

              <div className="animal-detail-field">
                <span className="animal-detail-label">Breed</span>
                <span className="animal-detail-value">
                  {formatValue(animal.breed)}
                </span>
              </div>

              <div className="animal-detail-field">
                <span className="animal-detail-label">Age</span>
                <span className="animal-detail-value">
                  {formatAge(animal.ageYears, animal.ageCategory)}
                </span>
              </div>

              <div className="animal-detail-field">
                <span className="animal-detail-label">Size</span>
                <span className="animal-detail-value">
                  {formatValue(animal.size)}
                </span>
              </div>

              <div className="animal-detail-field animal-detail-field--full">
                <span className="animal-detail-label">Temperament</span>
                <span className="animal-detail-value">
                  {animal.temperament || "—"}
                </span>
              </div>

              <div className="animal-detail-field animal-detail-field--full">
                <span className="animal-detail-label">Description</span>
                <span className="animal-detail-value">
                  {animal.description || "—"}
                </span>
              </div>
            </div>

            <div className="animal-detail-shelter">
              <h2 className="animal-detail-section-title">
                Shelter Information
              </h2>

              <div className="animal-detail-grid">
                <div className="animal-detail-field">
                  <span className="animal-detail-label">Shelter</span>
                  <span className="animal-detail-value">
                    {animal.shelter.name}
                  </span>
                </div>

                <div className="animal-detail-field">
                  <span className="animal-detail-label">City</span>
                  <span className="animal-detail-value">
                    {animal.shelter.city}
                  </span>
                </div>

                <div className="animal-detail-field animal-detail-field--full">
                  <span className="animal-detail-label">Contact Email</span>
                  <span className="animal-detail-value">
                    {animal.shelter.email !== "—" ? (
                      <a
                        href={`mailto:${animal.shelter.email}`}
                        className="animal-detail-email"
                      >
                        {animal.shelter.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="animal-detail-actions">
              <button
                className="animal-detail-secondary-btn"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="animal-detail-primary-btn"
                onClick={handleInquire}
              >
                Inquire
              </button>
            </div>
          </div>
        </div>

        {showInquiryModal && (
          <div
            className="animal-detail-modal-overlay"
            onClick={() => setShowInquiryModal(false)}
          >
            <div
              className="animal-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Inquiry</h2>
              <p>Inquiry modal can be connected later.</p>
              <p>
                Animal: <strong>{animal.name}</strong>
              </p>
              <button
                className="animal-detail-secondary-btn"
                onClick={() => setShowInquiryModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimalDetailPage;
