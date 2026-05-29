import { useAuth } from "../../contexts/AuthContext"
import { useFavorite } from "../../contexts/FavoriteContext"
import { useAnimal } from "../../contexts/AnimalContext"
import { useInquiry } from "../../contexts/InquiryContext"

const useGlobalLoading = () => {
    const { loading: authLoading } = useAuth();
    const { loading: favoriteLoading } = useFavorite();
    const { loading: animalLoading } = useAnimal();
    const { loading: inquiryLoading } = useInquiry();

    return(
        animalLoading ||
        authLoading ||
        inquiryLoading || 
        favoriteLoading
    )
};
export default useGlobalLoading;