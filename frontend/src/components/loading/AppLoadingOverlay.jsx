import { Spinner } from "react-bootstrap"
import useGlobalLoading from "./useGlobalLoading";

const AppLoadingOverlay = () => {
    
    const isLoading = useGlobalLoading();
    
    if(isLoading){
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