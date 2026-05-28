import { useEffect, useState } from "react";
import AnimalList from "../components/animals/AnimalList";
import SpecialNeedCarousel from "../components/animals/SpecialNeedCarousel";

const Home = () => {

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SpecialNeedCarousel />
      <AnimalList />
    </div>
  );
};

export default Home;
