import axios from "axios";

/**
 * 
//Account base url
const ACCOUNT_BASE_API = "http://localhost:8080/api/v1/account/"
const ACCOUNT_BASE_API_SECOND = "http://localhost:8080/api/v1/user/"

//Accounting base url
const ACCOUNTING_BASE_API = "http://localhost:8080/api/v1/accounting/"

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


const BASE_URL = "http://localhost:8080/api/v1";
const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/kunder";
const ACCOUNTING_API_BASE_URL = "http://localhost:8080/api/v1/bokföring";
const CALENDAR_API_BASE_URL = "http://localhost:8080/api/v1/kalender";
const AUTHENTICATION_API = "http://localhost:8080/api/v1/login";
const NOTES_API = "http://localhost:8080/api/v1/kunder/anteckningar";
const SEMESTER_API = "http://localhost:8080/api/v1/semester"


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



  //Saves the customer to the database
  saveCustomer(customer) {
    return axios.post(CUSTOMER_API_BASE_URL, customer);
  }

  getCustomers() {
    //Gets all customers from the database
    return axios.get(CUSTOMER_API_BASE_URL);
  }

  getCustomer(customer) {
    //Gets a single customer from the database
    return axios.get(CUSTOMER_API_BASE_URL + "/" + customer);
  }

  deleteCustomer(customer) {
    //Deletes a customer from the database with a specific id
    return axios.delete(CUSTOMER_API_BASE_URL + "/" + customer + "/remove");
  }

  saveWork(customer, work) {
    return axios.post(CUSTOMER_API_BASE_URL + "/" + customer + "/work/save", work);
  }

  getWork() {
    return axios.get(CUSTOMER_API_BASE_URL + "/work");
  }

  changeWork(customer, work) {
    return axios.put(CUSTOMER_API_BASE_URL + "/" + customer + "/work/update/", work);
  }

  deleteWork(customer, work) {
    //Deletes a work from the database with a specific id
    return axios.delete(CUSTOMER_API_BASE_URL + "/" + customer + "/work/delete/" + work);
  }

  getUpcomingWork() {
    //Gets upcoming work based on tomorrows date and ten days forward. 
    //Checks if any customer has work with startdate within 10 days.
    return axios.get(CUSTOMER_API_BASE_URL + "/upcoming");
  }

  //Gets ongoing work based on todays date.
  //Checks if any customer has work that has date = todays date
  //Used for updating workStatus
  getOngoingWork() {
    return axios.get(CUSTOMER_API_BASE_URL + "/ongoing");
  }

  findWorkAndUpdateToCompleted() {
    return axios.post(CUSTOMER_API_BASE_URL + "/work/update_workstatus_completed");
  }

  // ACCOUNTING / WARRANTY
  saveWarranty(warranty) {
    //Saves the warranty to the database (Can also update existing warranty if ID already exists)
    return axios.post(ACCOUNTING_API_BASE_URL, warranty);
  }

  getWarranties() {
    //Gets existing warranties from the database
    return axios.get(ACCOUNTING_API_BASE_URL);
  }

  getWarranty(warranty) {
    //Gets specific warranty from the database
    return axios.get(ACCOUNTING_API_BASE_URL + "/" + warranty);
  }

  getOldWarranty() {
    //Gets specific warranty from the database
    return axios.get(ACCOUNTING_API_BASE_URL + "/gamla_garantier");
  }

  getActiveWarranty() {
    //Gets specific warranty from the database
    return axios.get(ACCOUNTING_API_BASE_URL + "/aktiva_garantier");
  }

  deleteWarranty(warranty) {
    //Deletes an existing warranty from the database
    return axios.delete(ACCOUNTING_API_BASE_URL + "/" + warranty + "/remove");
  }

  getCalendar() {
    //Gets all existing info about calendar from the database
    return axios.get(CALENDAR_API_BASE_URL + "/work");
  }

  getNotes() {
    //Gets all existing info about calendar from the database
    return axios.get(NOTES_API);
  }

  saveSemester(date) {
    return axios.post(SEMESTER_API, date);
  }

  getSemester() {
    //Gets all existing info about calendar from the database
    return axios.get(CALENDAR_API_BASE_URL + "/semester");
  }

  deleteSemester(semesterId) {
    console.log(semesterId)
    return axios.delete(SEMESTER_API + "/" + semesterId + "/remove");
  }

  editSemester(semesterId, semester) {
    return axios.post(SEMESTER_API + "/" + semesterId + "/edit", semester);
  }

  saveNote(workId, noteList) {
    return axios.post(CUSTOMER_API_BASE_URL + "/anteckningar/save/" + workId, noteList);
  }

  deleteNote(noteId) { //Skall ej kunna göras?
    console.log(noteId)
    return axios.delete(CUSTOMER_API_BASE_URL + "/anteckningar/remove/" + noteId);
  }

  sumNote(workId, noteSum) {
    return axios.post(NOTES_API + "/summary/save/" + workId, noteSum);
  }

  getSummedNotes(customerId) {
    return axios.get(NOTES_API + "/summary/customer/" + customerId);
  }

  getOldNotes(workId) {
    return axios.get(NOTES_API + "/notesForWork/summarized/" + workId);
  }

  editNote(noteId, note) {
    return axios.post(NOTES_API + "/edit/" + noteId, note);
  }

  getUser(user) {
    return axios.get("http://localhost:8080/api/v1/user/" + user);
  }

  updateUser(user) {
    return axios.post("http://localhost:8080/api/v1/user/update", user);
  }

  changePassword(password) {
    console.log(password)
    return axios.post("http://localhost:8080/api/v1/change-password", password)
  }
}

export default new ApiConnector();
