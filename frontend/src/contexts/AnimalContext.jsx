import React, { createContext, useContext, useEffect, useState } from "react";

const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const BACKEND_API = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  // temporary fetchAnimals function from AnimalService.jsx

  const fetchAnimals = () => {
    return {
      animals: [
        {
          id: "6142e474-d91f-4940-b84b-d7a0e3e2a6df",
          name: "Mae",
          species: "Dog",
          breed: "Indian Spitz",
          age_years: 14.21,
          age_category: "SENIOR",
          size: "LARGE",
          special_needs: true,
          temperament: "Loyal and protective",
          description:
            "Terror odit acceptus iste advoco adamo aliqua exercitationem tertius.",
          photo_url:
            "https://s3.us-west-2.amazonaws.com/cdn2.thedogapi.com/images/BkMQll94X.jpg",
          status: "AVAILABLE",
          created_at: "2026-04-19T11:52:04.454Z",
          shelter_name: "Happy Animal Shelter",
          shelter_city: "Balistrericester",
          shelter_email: "brett_beahan@hotmail.com",
          shelter_phone: "(573) 527-7161",
        },
        {
          id: "37f403ed-4a82-45ec-8522-6134c0f2bca4",
          name: "Eliezer",
          species: "Rabbit",
          breed: "Rex",
          age_years: 4.01,
          age_category: "ADULT",
          size: "MEDIUM",
          special_needs: false,
          temperament: "Friendly and playful",
          description:
            "Ipsa solio adulescens cupio terror optio bibo vorago creptio.",
          photo_url:
            "https://firebasestorage.googleapis.com/v0/b/rabbitdb-9370d.appspot.com/o/rabbits%2F393930ed?alt=media&token=89c4ea17-d42d-408f-a1be-ed1bc5a1405a",
          status: "AVAILABLE",
          created_at: "2026-04-19T11:52:04.431Z",
          shelter_name: "Happy Animal Shelter",
          shelter_city: "Balistrericester",
          shelter_email: "brett_beahan@hotmail.com",
          shelter_phone: "(573) 527-7161",
        },
        {
          id: "a3d973a3-6017-4a99-9255-99b05b3badc2",
          name: "Karley",
          species: "Cat",
          breed: "Highlander",
          age_years: 11.31,
          age_category: "SENIOR",
          size: "SMALL",
          special_needs: true,
          temperament: "Loyal and protective",
          description: "Taedium supellex vitiosus amiculum defetiscor.",
          photo_url: "https://cdn2.thecatapi.com/images/uGWCE3F8u.jpg",
          status: "ADOPTED",
          created_at: "2026-04-19T11:52:04.409Z",
          shelter_name: "Happy Animal Shelter",
          shelter_city: "Balistrericester",
          shelter_email: "brett_beahan@hotmail.com",
          shelter_phone: "(573) 527-7161",
        },
      ],
    };
  };

  const getAnimals = async () => {
    setLoading(true);

    try {
      const data = fetchAnimals();
      setAnimals(data.animals || []);
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong while fetching animals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  useEffect(() => {
    console.log(animals);
  }, [animals]);

  return (
    <AnimalContext.Provider value={{ animals, loading, error }}>
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimal = () => useContext(AnimalContext);
