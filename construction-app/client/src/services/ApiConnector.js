import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1";
const NOTESUMMARY_BASE_API = BASE_URL + "/summary";
const ACCOUNT_BASE_API = BASE_URL + "/account";
const WORK_BASE_API = BASE_URL + "/work";
const VACATION_BASE_API = BASE_URL + "/vacation";
const CUSTOMER_BASE_API = BASE_URL + "/customers";
const CALENDAR_BASE_API = BASE_URL + "/calendar";
const GUARENTEES_BASE_API = BASE_URL + "/guarantees";
const CUSTOMERNOTE_BASE_API = BASE_URL + "/notes";
const AUTHENTICATION_API = BASE_URL + "/authenticate";

axios.interceptors.request.use(
  (config) => {
    const excludedEndpoints = [
      BASE_URL + "/authentication",
      BASE_URL + "/refresh",
      BASE_URL + "/initiate-email-recovery",
      BASE_URL + "/api/v1/recover",
    ];

    if (!excludedEndpoints.includes(config.url)) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const excludedEndpoints = [BASE_URL + "/recover"];

    const status = error.response ? error.response.status : null;
    if (status === 401 && !excludedEndpoints.includes(error.config.url)) {
      // If the access token has expired, try to refresh it using the refresh token
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken && error.response.data !== "Refresh misslyckades") {
        try {
          const accessToken = await refreshAccessToken(refreshToken);
          // If the refresh token request was successful, retry the original request
          error.config.headers["Authorization"] = `${accessToken}`;
          return await axios.request(error.config);
        } catch (err) {
          // If the refresh token request fails, clear the refresh token and return the error
          localStorage.removeItem("refreshToken");
          return await Promise.reject(err);
        }
      } else {
        window.location.reload(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  }
);

let refreshPromise = null;
async function refreshAccessToken(refreshToken) {
  const refresh = async () => {
    await axios
      .post(BASE_URL + "/refresh", { refreshToken })
      .then((response) => {
        if (response.status === 200) {
          const newAccessToken = response.headers.authorization;
          const newRefreshToken = response.headers.refreshtoken;

          // Store the new access and refresh tokens in local storage or a cookie
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Return the new access token
          return newAccessToken;
        }
      })
      .catch((error) => {
        console.log(error);
        // If the refresh token is invalid or has expired, log out the user
        window.location.reload(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  };

  if (!refreshPromise) {
    refreshPromise = refresh().then((accessToken) => {
      refreshPromise = null;
      return accessToken;
    });
  }

  await refreshPromise;
}

class ApiConnector {
  login(credentials, headers) {
    //Logging in in the user
    return axios.post(AUTHENTICATION_API, credentials, headers);
  }

  recover(token) {
    //Gets the recover token
    return axios.post(BASE_URL + "/recover", token);
  }

  // ----------- CUSTOMER -----------
  saveCustomer(customer) {
    //Saves the customer to the database
    return axios.post(CUSTOMER_BASE_API, customer);
  }

  getCustomers() {
    //Gets all customers from the database
    return axios.get(CUSTOMER_BASE_API);
  }

  getCustomer(customer) {
    //Gets a single customer from the database
    return axios.get(CUSTOMER_BASE_API + "/" + customer);
  }

  deleteCustomer(customer) {
    //Deletes a customer from the database with a specific id
    return axios.delete(CUSTOMER_BASE_API + "/" + customer + "/remove");
  }

  // ----------- WORK -----------
  saveWork(customer, work) {
    //Saves a work
    return axios.post(WORK_BASE_API + "/" + customer + "/save", work);
  }

  getWork() {
    //Gets all existing work from the database
    return axios.get(WORK_BASE_API);
  }

  changeWork(customer, work) {
    //Changes a specific work
    return axios.put(WORK_BASE_API + "/" + customer + "/update/", work);
  }

  deleteWork(customer, work) {
    //Deletes a work from the database with a specific id
    return axios.delete(WORK_BASE_API + "/" + customer + "/delete/" + work);
  }

  getUpcomingWork() {
    //Checks if any customer has work with startdate within 10 days.
    return axios.get(WORK_BASE_API + "/upcoming");
  }

  getOngoingWork() {
    //Gets ongoing work based on todays date.
    return axios.get(WORK_BASE_API + "/ongoing");
  }

  findWorkAndUpdateToCompleted(workId) {
    //Used for updating workStatus
    return axios.get(WORK_BASE_API + "/update-workstatus-completed/ " + workId);
  }

  // ----------- ACCOUNTING / WARRANTY / GUARANTEE -----------
  saveWarranty(warranty) {
    //Saves the warranty/guarantee/"accounting" to the database (Can also update existing warranty if ID already exists)
    return axios.post(GUARENTEES_BASE_API, warranty);
  }

  getWarranties() {
    //Gets existing warranties/guarantees/"accountings" from the database
    return axios.get(GUARENTEES_BASE_API);
  }

  getWarranty(warranty) {
    //Gets specific warranty/guarantee/"accounting" from the database
    return axios.get(GUARENTEES_BASE_API + "/" + warranty);
  }

  getOldWarranty() {
    //Gets specific warranty/guarantee/"accounting" from the database
    return axios.get(GUARENTEES_BASE_API + "/old-guarantees");
  }

  getActiveWarranty() {
    //Gets specific warranty/guarantee/"accounting" from the database
    return axios.get(GUARENTEES_BASE_API + "/active-guarantees");
  }

  deleteWarranty(warranty) {
    //Deletes an existing warranty/guarantee/"accounting" from the database
    return axios.delete(GUARENTEES_BASE_API + "/" + warranty + "/remove");
  }

  // ----------- CALENDAR -----------
  getCalendar() {
    //Gets all existing info about the work calendar from the database
    return axios.get(CALENDAR_BASE_API + "/work");
  }

  getSemester() {
    //Gets all existing info about the vacation/"semester" calendar from the database
    return axios.get(CALENDAR_BASE_API + "/vacation");
  }

  // ----------- VACATION / "SEMESTER" -----------
  saveSemester(date) {
    //Saves a new vacation to the database
    return axios.post(VACATION_BASE_API, date);
  }

  getAmountOfNotOldSemesterDays() {
    //Gets all existing info about calendar from the database
    return axios.get(VACATION_BASE_API + "/amount-not-old");
  }

  deleteSemester(semesterId) {
    return axios.delete(VACATION_BASE_API + "/" + semesterId + "/remove");
  }

  editSemester(semesterId, semester) {
    //Edits a vaction with given id
    return axios.post(
      VACATION_BASE_API + "/" + semesterId + "/update",
      semester
    );
  }

  // ----------- CUSTOMER NOTE -----------
  saveNote(workId, noteList) {
    //Saves a new note
    return axios.post(CUSTOMERNOTE_BASE_API + "/save/" + workId, noteList);
  }

  deleteNote(noteId) {
    //Deletes a note
    return axios.delete(CUSTOMERNOTE_BASE_API + "/" + noteId + "/remove");
  }

  getNotesForSum(sumId) {
    //Gets summed notes
    return axios.get(CUSTOMERNOTE_BASE_API + "/notes-for-sum/" + sumId);
  }

  editNote(workId, noteList) {
    //Edits a note
    return axios.post(CUSTOMERNOTE_BASE_API + "/" + workId + "/edit", noteList);
  }

  // ----------- NOTE SUMMARY -----------
  sumNote(workId, noteSum) {
    //Sum notes for a specific work
    return axios.post(NOTESUMMARY_BASE_API + "/save/" + workId, noteSum);
  }

  getSummedNotes(customerId) {
    //Gets the summed notes for a customer
    return axios.get(NOTESUMMARY_BASE_API + "/" + customerId);
  }

  // ----------- USER -----------
  getUser(user) {
    //Gets the profile
    return axios.get(ACCOUNT_BASE_API + "/" + user);
  }

  updateUser(user) {
    //Updates the profile
    return axios.post(ACCOUNT_BASE_API + "/update", user);
  }

  // ----------- CHANGE PASSWORD -----------
  changePassword(password) {
    //changes the password
    return axios.post(BASE_URL + "/change-password", password);
  }

  recoverPassword(email) {
    //Initiates the password recover
    return axios.post(BASE_URL + "/initiate-email-recovery", email);
  }

  // ----------- CALENDAR COLOR -----------
  getColors() {
    //Gets the calendar colors
    return axios.get(BASE_URL + "/calendarcolor");
  }

  updateColors(colors) {
    //Updates the calendar colors
    return axios.post(BASE_URL + "/calendarcolor", colors);
  }
}

export default new ApiConnector();
