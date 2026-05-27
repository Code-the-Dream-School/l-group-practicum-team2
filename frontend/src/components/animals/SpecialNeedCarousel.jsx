import Carousel from "react-bootstrap/Carousel";
import { Col, Row } from "react-bootstrap";
import AnimalCard from "./AnimalCard";
import { HeartFill } from "react-bootstrap-icons";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import { useAnimal } from "../../contexts/AnimalContext";

const SpecialNeedCarousel = () => {
  const { animals, loading, error } = useAnimal();

  const specialNeedsAnimals = animals.filter((a) => a.special_needs);

  if (loading)
    return <LoadingSpinner message="Loading special needs companions..." />;

  return (
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

      {error && (
        <ErrorMessage
          message="Failed to load special needs companions. Please try again."
          error={error}
        />
      )}
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
          {specialNeedsAnimals.map((specialNeedsAnimal) => {
            return (
              <Carousel.Item key={specialNeedsAnimal.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "540px" }}>
                    <AnimalCard animal={specialNeedsAnimal} />
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default SpecialNeedCarousel;
