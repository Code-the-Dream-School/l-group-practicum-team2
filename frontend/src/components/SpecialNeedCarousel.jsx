import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Toast from "react-bootstrap/Toast";
import { useState } from "react";

import { useSpecialNeeds } from "../context/SpecialNeedContext";
import { useNavigate } from "react-router-dom";

const SpecialNeedCarousel = () => {
  const { specialNeeds } = useSpecialNeeds();
  const [show, setShow] = useState(false);

  // uncomment when detail page is merged
  // const navigate = useNavigate();
  const handleClick = (id) => {
    setShow(true);
    // uncomment when detail page is merged
    // navigate(`/animals/${id}`);
  };
  return (
    <>
      <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
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
        <Carousel style={{ width: "100%" }} data-bs-theme="dark">
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
                  <Image
                    alt={specialNeed.id}
                    src={specialNeed.photo_url}
                    style={{ width: "540px", height: "360px" }}
                    rounded
                  />
                </div>
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    color: "#000",
                  }}
                >
                  <h3>{specialNeed.name}</h3>
                  <p className="mb-3">{specialNeed.breed}</p>

                  <p>{specialNeed.temperament}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default SpecialNeedCarousel;
