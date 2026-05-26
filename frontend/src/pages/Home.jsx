import { useEffect, useState } from "react";
import AnimalList from "../components/animals/AnimalList";
import SpecialNeedCarousel from "../components/animals/SpecialNeedCarousel";

const Home = () => {
  const [accountDeletedMessage, setAccountDeletedMessage] = useState("");

  useEffect(() => {
  const timeoutId = setTimeout(() => {
    const message = localStorage.getItem("accountDeletedMessage");

    if (message) {
      setAccountDeletedMessage(message);
      localStorage.removeItem("accountDeletedMessage");
    }
  }, 0);

  return () => clearTimeout(timeoutId);
}, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {accountDeletedMessage && (
        <div
          className="alert alert-success"
          role="alert"
          style={{ width: "100%", maxWidth: "800px", marginBottom: "1rem" }}
        >
          {accountDeletedMessage}
        </div>
      )}

      <SpecialNeedCarousel />
      <AnimalList />
    </div>
  );
};

export default Home;
