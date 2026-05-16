import SpecialNeedCarousel from "../components/animals/SpecialNeedCarousel";
import AnimalList from "../components/animals/AnimalList";

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
