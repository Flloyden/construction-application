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
        <div className="flex items-center">
          <div className="rounded-full p-1 bg-blue-600 flex align-middle justify-center items-center">
            <img
              src={userInfo.profileImage}
              alt="profile pic"
              className="w-24 h-24 object-cover rounded-full border-1 border-blue-600 bg-blue-600"
            />
          </div>
          <div className="ml-4">
            <div className="text-2xl">
              <h1>
                Hej, <span className="font-bold">{userInfo.username}</span>
              </h1>
            </div>
            <div className="mt-2">
              <p className="font-normal">Utforksa dina aktiviteter en stund.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
