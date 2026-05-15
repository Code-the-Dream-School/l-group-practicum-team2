import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GeoAlt } from "react-bootstrap-icons";
import { fetchShelterById } from "../../services/shelters";
import { mockShelters } from "../../constants/shelters";

// Shows the shelter behind an animal: name, address, and contact details.
// Fetches the shelter by id and handles its own loading and error states
// so the animal detail page does not have to.
export default function ShelterInfo({ shelterId }) {
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!shelterId) {
      return;
    }

    let ignore = false;

    async function loadShelter() {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchShelterById(shelterId);

        if (!ignore) {
          if (data) {
            setShelter(data);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch shelter:", err);

        // Fall back to mock data until the backend endpoint is ready.
        const fallbackShelter = mockShelters.find(
          (item) => String(item.id) === String(shelterId)
        );

        if (!ignore) {
          if (fallbackShelter) {
            setShelter(fallbackShelter);
          } else {
            setError(true);
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadShelter();

    return () => {
      ignore = true;
    };
  }, [shelterId]);

  if (!shelterId) {
    return (
      <section className="detail-section shelter-card">
        <h2>Shelter Information</h2>
        <p>Shelter info unavailable.</p>
      </section>
    );
  }

  return (
    <section className="detail-section shelter-card">
      <h2>Shelter Information</h2>

      {loading && <p>Loading shelter information...</p>}

      {!loading && error && <p>Shelter info unavailable.</p>}

      {!loading && !error && shelter && (
        <div className="shelter-info">
          <div className="shelter-info-main">
            <GeoAlt className="shelter-info-icon" aria-hidden="true" />
            <div>
              <p className="shelter-info-name">{shelter.name}</p>
              {(shelter.address || shelter.city) && (
                <p className="shelter-info-address">
                  {[shelter.address, shelter.city].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
          </div>

          <dl className="shelter-info-contact">
            {shelter.contact_email && (
              <div className="shelter-info-contact-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${shelter.contact_email}`}>
                    {shelter.contact_email}
                  </a>
                </dd>
              </div>
            )}
            {shelter.phone && (
              <div className="shelter-info-contact-row">
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${shelter.phone}`}>{shelter.phone}</a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </section>
  );
}

ShelterInfo.propTypes = {
  shelterId: PropTypes.string,
};
