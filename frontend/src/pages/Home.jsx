import AnimalList from "../components/animals/AnimalList";
import SpecialNeedCarousel from "../components/animals/SpecialNeedCarousel";
import AnimalListPlaceholder from "../components/placeholders/AnimalListPlaceholder";
// import useGlobalLoading from "../components/loading/useGlobalLoading";
import { useAnimal } from "../contexts/AnimalContext";
const Home = () => {
  const { loading: animalLoading } = useAnimal();

  if (animalLoading) return <AnimalListPlaceholder />;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <title>Browse Animals - PawMatch</title>
      <SpecialNeedCarousel />
      <AnimalList />
    </div>
  );
};

export default Home;
