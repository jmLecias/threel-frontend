import {Navigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, home } = useAuth();

    if (!user) {
        return <Navigate to={home} replace />;
    }
    
    return (
        <>
            <ToastContainer/>
            {children}
        </>
    );
};

export default ProtectedRoute;
