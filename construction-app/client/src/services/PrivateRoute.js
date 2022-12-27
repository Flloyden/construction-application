import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Gets the key in localstorage
  const navigate = useNavigate();
  const getValue = localStorage.getItem('accessToken');
  let auth = { token: getValue };
  console.log(auth)

  function checkToken() {
    if (!auth.token) {
      navigate("/login")
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
