import PropTypes from "prop-types";
import { GeoAlt } from "react-bootstrap-icons";


export default function ShelterInfo({
  shelter_name,
  shelter_city,
  shelter_email,
  shelter_phone,
}) {
  const hasShelter =
    shelter_name || shelter_city || shelter_email || shelter_phone;

  if (!hasShelter) {
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

      <div className="shelter-info">
        <div className="shelter-info-main">
          <GeoAlt className="shelter-info-icon" aria-hidden="true" />
          <div>
            {shelter_name && (
              <p className="shelter-info-name">{shelter_name}</p>
            )}
            {shelter_city && (
              <p className="shelter-info-address">{shelter_city}</p>
            )}
          </div>
        </div>

        <dl className="shelter-info-contact">
          {shelter_email && (
            <div className="shelter-info-contact-row">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${shelter_email}`}>{shelter_email}</a>
              </dd>
            </div>
          )}
          {shelter_phone && (
            <div className="shelter-info-contact-row">
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${shelter_phone}`}>{shelter_phone}</a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}

ShelterInfo.propTypes = {
  shelter_name: PropTypes.string,
  shelter_city: PropTypes.string,
  shelter_email: PropTypes.string,
  shelter_phone: PropTypes.string,
};
