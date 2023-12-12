import useCurrentUserRole from "../../hooks/useCurrentUserRole";

const AdminRoute = ({ children }) => {
    const { isAdmin } = useCurrentUserRole();
    if (isAdmin) {
        return children;
    }
    return (<div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
            <h3 className='text-3xl'>You are not authorized</h3>
            <p>Only an admin can access that page.</p>
        </div>
    </div>)
};

export default AdminRoute;