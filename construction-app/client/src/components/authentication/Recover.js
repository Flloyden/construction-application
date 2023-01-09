import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiConnector from "../../services/ApiConnector";

export default function Recover() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get("token");
    // Check if the token is present and valid
    if (!token) {
      console.log("Recover: No token provided in search params.");
      navigate("/login");
      return;
    }

    // Tries to get data from api
    const recover = async () => {
      try {
        const request = {
          token,
        };

        const response = await ApiConnector.recover(request);

        // Navigate to login page if recovery was successful
        if (response.status === 202) {
          navigate("/login");
        } else {
          console.log("Recover: Recovery failed.");
        }
      } catch (error) {
        console.log("Recover:", error);
      }
    };

    recover();
  }, [searchParams]);
}
