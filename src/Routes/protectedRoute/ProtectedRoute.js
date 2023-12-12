import useCurrentUserRole from '../../hooks/useCurrentUserRole';

const ProtectedRoute = ({ children }) => {
    const { isGeneralUser } = useCurrentUserRole();
    if (!isGeneralUser) {
        return children
    }
    return (<div className='min-h-screen flex justify-center items-center'>
        <div className='text-center'>
            <h3 className='text-3xl'>You are not authorized</h3>
            <p>Only an admin or a moderator can access dashboard page.</p>
        </div>
    </div>);
};

export default ProtectedRoute;