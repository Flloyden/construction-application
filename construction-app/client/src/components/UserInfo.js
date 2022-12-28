import React, { useEffect, useState } from "react";
import ApiConnector from "../services/ApiConnector";

export default function UserInfo() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getUser(1);
        setUserInfo(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {!loading && (
        <div className="flex items-center w-1/2">
          <div className="w-fit h-full">
            <div className="w-24">
              <div className="rounded-full p-1 bg-blue-600 flex align-middle justify-center items-center">
                <img
                  src={userInfo.profileImage}
                  alt="profile pic"
                  className="object-cover rounded-full border-1 border-blue-600 bg-blue-600"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 w-full">
            <div className="text-2xl">
              <h1>
                Hej, <span className="font-bold">{userInfo.name}</span>
              </h1>
            </div>
            <div className="mt-2">
              <p className="font-normal">Utforska dina aktiviteter en stund.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
