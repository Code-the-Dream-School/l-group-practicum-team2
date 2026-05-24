import { Spinner } from "react-bootstrap";
import { useAnimal } from "../contexts/AnimalContext";
import { useAuth } from "../contexts/AuthContext";
//npm install react-loading-skeleton
const FullScreenSpinner = () => {
  const { loading: authLoading } = useAuth();
  const { loading: animalLoading } = useAnimal();

  if (!authLoading && !animalLoading) return;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)", // gray out
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Spinner animation="border" />
    </div>
  );
};

export default FullScreenSpinner;
