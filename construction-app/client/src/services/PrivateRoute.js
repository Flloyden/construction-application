import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // Gets the key in localstorage
  const getValue = localStorage.getItem('accessToken');
  let auth = { token: getValue };
  console.log(auth)

  function checkToken() {
    if (!auth.token) {
      return <Navigate to={"/login"} replace />
    } else {
      return <Outlet />
    }
  }

  return (
    // Navigates the user to the right page if logged in or not
    checkToken()
  );
};

export default PrivateRoutes;
