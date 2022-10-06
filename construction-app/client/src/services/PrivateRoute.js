import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    // Gets the key in localstorage
   const getValue = localStorage.getItem('key');
    let auth = {"token":getValue}

    return(
        // Navigates the user to the right page if logged in or not
        auth.token ? <Outlet/> : <Navigate to="/login" state={{ auth }} />
    )
}

export default PrivateRoutes