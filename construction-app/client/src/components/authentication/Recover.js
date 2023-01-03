import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApiConnector from "../../services/ApiConnector";

export default function Recover() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("token"));

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const recover = async () => {
      // Tries to get data from api
      try {
        const request = {
          token: searchParams.get("token"),
        };

        const response = await ApiConnector.recover(request);

        console.log(response);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
    };
    recover();
  }, [searchParams]);
}
