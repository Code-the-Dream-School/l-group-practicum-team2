import AnimalList from "../components/animals/AnimalList";

const Home = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AnimalList />
    </div>
  );
};
export default Home;