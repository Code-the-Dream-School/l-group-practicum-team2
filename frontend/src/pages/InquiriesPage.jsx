import { useEffect, useState } from "react";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserInquiries } from "../services/inquiryService";

function InquiriesPage() {
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInquiries = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getUserInquiries();
        const sortedInquiries = [...result.data].sort(
          (a, b) =>
            new Date(b.created_at || b.createdAt) -
            new Date(a.created_at || a.createdAt)
        );

        setInquiries(sortedInquiries);
      } catch (err) {
        setError(err.message || "Failed to load inquiries.");
      } finally {
        setLoading(false);
      }
    };

    loadInquiries();
  }, []);

  if (loading) {
    return (
      <main className="py-4">
        <Spinner animation="border" />
        <p className="mt-3">Loading your inquiries...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-4">
        <Alert variant="danger">{error}</Alert>
      </main>
    );
  }

  return (
    <main className="py-4">
      <h1 className="mb-3">My Inquiries</h1>

      {inquiries.length === 0 ? (
        <Card className="p-4 text-center">
          <h3>No inquiries yet</h3>
          <p className="text-muted">
            When you send an adoption inquiry, it will appear here.
          </p>
          <Button onClick={() => navigate("/login")}>Browse Animals</Button>
        </Card>
      ) : (
        <div className="row g-4">
          {inquiries.map((inquiry) => {
            const animalId = inquiry.animal_id || inquiry.animalId;
            const animalName =
              inquiry.animal_name || inquiry.animalName || "Animal";
            const animalPhoto =
              inquiry.animal_photo ||
              inquiry.animalPhoto ||
              inquiry.photo_url ||
              inquiry.photoUrl;

            const submittedDate = inquiry.created_at || inquiry.createdAt;
            const status = inquiry.status || "sent";

            return (
              <div className="col-12 col-md-6 col-lg-4" key={inquiry.id}>
                <Card
                  className="h-100 shadow-sm"
                  role="button"
                  onClick={() => navigate(`/animals/${animalId}`)}
                >
                  {animalPhoto && (
                    <Card.Img
                      variant="top"
                      src={animalPhoto}
                      alt={animalName}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  )}

                  <Card.Body>
                    <Card.Title>{animalName}</Card.Title>

                    <p className="text-muted mb-2">
                      {inquiry.message?.slice(0, 120)}
                      {inquiry.message?.length > 120 ? "..." : ""}
                    </p>

                    <p className="mb-1">
                      <strong>Status:</strong> {status}
                    </p>

                    <p className="mb-0 text-muted">
                      Submitted:{" "}
                      {submittedDate
                        ? new Date(submittedDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default InquiriesPage;
