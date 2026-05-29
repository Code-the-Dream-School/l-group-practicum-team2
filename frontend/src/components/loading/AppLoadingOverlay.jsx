import { Spinner } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useFavorite } from "../../contexts/FavoriteContext"
import { useAnimal } from "../../contexts/AnimalContext"
import { useInquiry } from "../../contexts/InquiryContext"

const AppLoadingOverlay = () => {
    const { loading: authLoading } = useAuth();
    const { loading: favoritesLoading } = useFavorite();
    const { loading: animalLoading } = useAnimal();
    const { loading: inquiryLoading } = useInquiry();

    if(authLoading || favoritesLoading || animalLoading || inquiryLoading){
        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)', // gray out
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}>
                <Spinner animation="border" />
            
            </div>
        )
    };
}

export default AppLoadingOverlay;