import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AnimalListSkeleton = () => {
    return (
        <div className='animals-grid'>
            {[...Array(12)].map((_, i) => (
                <div style={{ display: 'flex', flexDirection:"column", gap: 8 }}>
                <Skeleton height={180} /> 
    
                <div style={{ marginTop: '10' }}>
                    <Skeleton height={15} width="100%" /> 
                    <Skeleton height={15} width="100%" /> 
                    <Skeleton height={15} width="100%" />
                </div>
                </div>
            ))}
        </div>
    )
}
export default AnimalListSkeleton;