import { Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Toast from "react-bootstrap/Toast";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSpecialNeeds } from "../../services/SpecialNeedContext";

import AnimalCard from "./AnimalCard";
import { HeartFill } from "react-bootstrap-icons";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const SpecialNeedCarousel = () => {
  const { specialNeeds, loading, error, getSpecialNeed } = useSpecialNeeds();
  const [show, setShow] = useState(false);

  // uncomment when detail page is merged
  // const navigate = useNavigate();
  const handleClick = () => {
    setShow(true);
    // uncomment when detail page is merged
    // navigate(`/animals/${id}`);
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner message="Loading special needs companions..." />
      ) : (
        <>
          <Row>
            <Col xs="auto" style={{ padding: "2rem 1rem" }}>
              <div
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "50%",
                  backgroundColor: "orange",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HeartFill size={40} color="white" />
              </div>
            </Col>
            <Col
              className="flex-grow-1"
              style={{
                display: "flex",
                alignItems: "flexStart",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2>Need Extra Love</h2>
              Senior and special needs companions waiting for a home
            </Col>
          </Row>

          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            autohide
          >
            <Toast.Body>Coming soon</Toast.Body>
          </Toast>
          <div
            style={{
              width: "992px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Carousel
              style={{ width: "100%" }}
              indicators={false}
              data-bs-theme="dark"
            >
              {specialNeeds.map((specialNeed) => {
                return (
                  <Carousel.Item key={specialNeed.id}>
                    <div
                      onClick={() => handleClick(specialNeed.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "540px",
                        }}
                      >
                        <AnimalCard animal={specialNeed} />
                      </div>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </>
      )}
      <ErrorMessage
        message="Failed to load special needs companions. Please try again."
        handleRetry={getSpecialNeed}
        error={error}
      />
    </>
  );
};

export default SpecialNeedCarousel;
