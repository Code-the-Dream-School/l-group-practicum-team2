import { useEffect, useState } from "react";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useInquiry } from "../contexts/InquiryContext";

function InquiriesPage() {
  const { inquiries } = useInquiry();
  const navigate = useNavigate();

  return (
    <main className="py-4">
      <h1 className="mb-3">My Inquiries</h1>

      {inquiries.length === 0 ? (
        <Card className="p-4 text-center">
          <h3>No inquiries yet</h3>
          <p className="text-muted">
            When you send an adoption inquiry, it will appear here.
          </p>
          <Button onClick={() => navigate("/")}>Browse Animals</Button>
        </Card>
      ) : (
        <div className="row g-4">
          {inquiries.map((inquiry) => {
            const animalId = inquiry.animal_id;
            const animalName = inquiry.animal_name;
            const animalPhoto = inquiry.photo_url
         

            const submittedDate = inquiry.created_at;
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
