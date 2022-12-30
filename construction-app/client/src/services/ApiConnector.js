import axios from "axios";

/**
 * 
//Account base url
const ACCOUNT_BASE_API = "http://localhost:8080/api/v1/account/"
const ACCOUNT_BASE_API_SECOND = "http://localhost:8080/api/v1/user/"

//Guarentees base url
const GUARENTEES_BASE_API = "http://localhost:8080/api/v1/guarantees/"

//Authentication base url
const AUTHENTICATION_BASE_API = "http://localhost:8080/api/v1/authenticate/"

//Calendar base url
const CALENDAR_BASE_API = "http://localhost:8080/api/v1/calendar/"

//Customer base url
const CUSTOMER_BASE_API = "http://localhost:8080/api/v1/customers/"

//CustomerNote base url
const CUSTOMERNOTE_BASE_API = "http://localhost:8080/api/v1/notes/"

//NoteSummary base url
const NOTESUMMARY_BASE_API = "http://localhost:8080/api/v1/summary/"

//Vacation base url
const VACATION_BASE_API = "http://localhost:8080/api/v1/vacation/"

//Work base url
const WORK_BASE_API = "http://localhost:8080/api/v1/work/"
 */


const NOTESUMMARY_BASE_API = "http://localhost:8080/api/v1/summary";
const ACCOUNT_BASE_API = "http://localhost:8080/api/v1/account";
const WORK_BASE_API = "http://localhost:8080/api/v1/work";
const VACATION_BASE_API = "http://localhost:8080/api/v1/vacation";
const CUSTOMER_BASE_API = "http://localhost:8080/api/v1/customers";
const CALENDAR_BASE_API = "http://localhost:8080/api/v1/calendar";
const GUARENTEES_BASE_API = "http://localhost:8080/api/v1/guarantees";
const CUSTOMERNOTE_BASE_API = "http://localhost:8080/api/v1/notes";


const BASE_URL = "http://localhost:8080/api/v1";
const AUTHENTICATION_API = "http://localhost:8080/api/v1/login";


axios.interceptors.request.use(
  config => {
    const excludedEndpoints = [
      'http://localhost:8080/api/v1/authentication',
      'http://localhost:8080/api/v1/refresh',
      'http://localhost:8080/api/v1/initiate-email-recovery',
      'http://localhost:8080/api/v1/recover'];

    if (!excludedEndpoints.includes(config.url)) {

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `${accessToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // If the access token has expired, try to refresh it using the refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        return refreshAccessToken(refreshToken).then(accessToken => {
          // If the refresh token request was successful, retry the original request
          error.config.headers['Authorization'] = `${accessToken}`;
          return axios.request(error.config);
        }).catch(err => {
          // If the refresh token request fails, clear the refresh token and return the error
          localStorage.removeItem('refreshToken');
          return Promise.reject(err);
        });
      }
    }
    return Promise.reject(error);
  }
);

let refreshPromise = null;
async function refreshAccessToken(refreshToken) {
  const refresh = async () => {
    try {
      const response = await axios.post(BASE_URL + '/refresh', {
        refreshToken
      });
      const newAccessToken = response.headers.authorization
      const newRefreshToken = response.headers.refreshtoken

      // Store the new access and refresh tokens in local storage or a cookie
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      // Return the new access token
      return newAccessToken;
    } catch (error) {
      // If the refresh token is invalid or has expired, log out the user
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  if (!refreshPromise) {
    refreshPromise = refresh().then(accessToken => {
      refreshPromise = null
      return accessToken
    })
  }
  await refreshPromise
}

class ApiConnector {
  authenicate() {
    return axios.post(AUTHENTICATION_API)
  }

  recover(token) {
    return axios.post(BASE_URL + "/recover", token)
  }

  //Saves the customer to the database
  saveCustomer(customer) {
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

  saveWork(customer, work) {
    return axios.post(WORK_BASE_API + "/" + customer + "/save", work);
  }

  getWork() {
    return axios.get(WORK_BASE_API);
  }

  changeWork(customer, work) {
    return axios.put(WORK_BASE_API + "/" + customer + "/update/", work);
  }

  deleteWork(customer, work) {
    //Deletes a work from the database with a specific id
    return axios.delete(WORK_BASE_API + "/" + customer + "/delete/" + work);
  }

  getUpcomingWork() {
    //Gets upcoming work based on tomorrows date and ten days forward. 
    //Checks if any customer has work with startdate within 10 days.
    return axios.get(WORK_BASE_API + "/upcoming");
  }

  //Gets ongoing work based on todays date.
  //Checks if any customer has work that has date = todays date
  //Used for updating workStatus
  getOngoingWork() {
    return axios.get(WORK_BASE_API + "/ongoing");
  }

  findWorkAndUpdateToCompleted() {
    return axios.post(WORK_BASE_API + "/update_workstatus_completed");
  }

  // ACCOUNTING / WARRANTY
  saveWarranty(warranty) {
    //Saves the warranty to the database (Can also update existing warranty if ID already exists)
    return axios.post(GUARENTEES_BASE_API, warranty);
  }

  getWarranties() {
    //Gets existing warranties from the database
    return axios.get(GUARENTEES_BASE_API);
  }

  getWarranty(warranty) {
    //Gets specific warranty from the database
    return axios.get(GUARENTEES_BASE_API + "/" + warranty);
  }

  getOldWarranty() {
    //Gets specific warranty from the database
    return axios.get(GUARENTEES_BASE_API + "/old-guarantees");
  }

  getActiveWarranty() {
    //Gets specific warranty from the database
    return axios.get(GUARENTEES_BASE_API + "/active-guarantees");
  }

  deleteWarranty(warranty) {
    //Deletes an existing warranty from the database
    return axios.delete(GUARENTEES_BASE_API + "/" + warranty + "/remove");
  }

  getCalendar() {
    //Gets all existing info about calendar from the database
    return axios.get(CALENDAR_BASE_API + "/work");
  }

  saveSemester(date) {
    return axios.post(VACATION_BASE_API, date);
  }

  getSemester() {
    //Gets all existing info about calendar from the database
    return axios.get(VACATION_BASE_API);
  }

  deleteSemester(semesterId) {
    console.log(semesterId)
    return axios.delete(VACATION_BASE_API + "/" + semesterId + "/remove");
  }

  editSemester(semesterId, semester) {
    return axios.post(VACATION_BASE_API + "/" + semesterId + "/update", semester);
  }

  saveNote(workId, noteList) {
    return axios.post(CUSTOMERNOTE_BASE_API + "/save/" + workId, noteList);
  }

  deleteNote(noteId) { 
    console.log(noteId)
    return axios.delete(CUSTOMERNOTE_BASE_API + "/" + noteId + "/remove");
  }

  sumNote(workId, noteSum) {
    return axios.post(NOTESUMMARY_BASE_API + "/save/" + workId, noteSum);
  }

  getSummedNotes(customerId) {
    return axios.get(NOTESUMMARY_BASE_API + "/" + customerId);
  }

  getOldNotes(workId) {
    return axios.get(CUSTOMERNOTE_BASE_API + "/sum-notes/" + workId);
  }

  editNote(workId, noteList) {
    return axios.post(CUSTOMERNOTE_BASE_API + "/" + workId + "/edit", noteList);
  }

  getUser(user) {
    return axios.get(ACCOUNT_BASE_API + "/" + user);
  }

  updateUser(user) {
    return axios.post(ACCOUNT_BASE_API + "/update", user);
  }

  changePassword(password) {
    console.log(password)
    return axios.post("http://localhost:8080/api/v1/change-password", password)
  }

  recoverPassword(email) {
    return axios.post("http://localhost:8080/api/v1/initiate-email-recovery", email)
  }
}

export default new ApiConnector();
