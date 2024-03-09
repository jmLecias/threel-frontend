import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PublicRoute = ({ children }) => {
    const { user, home } = useAuth();

    
    if (user) {
        return <Navigate to={home} replace />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default PublicRoute;
