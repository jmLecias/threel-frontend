import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, home } = useAuth();

    if (!user || !(user.user_type >= 3)) { // id: 3, 4 = admin, superadmin
        return <Navigate to={home} replace />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default AdminRoute;
