import SpecialNeedCarousel from "../components/SpecialNeedCarousel";

const Home = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Special Need Animals</h2>
      <SpecialNeedCarousel />
    </div>
  );
};
export default Home;
