import axios from "axios";

// Base url to get api
const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/kunder";
const ACCOUNTING_API_BASE_URL = "http://localhost:8080/api/v1/bokföring";
const CALENDAR_API_BASE_URL = "http://localhost:8080/api/v1/kalender";
const AUTHENTICATION_API = "http://localhost:8080/api/v1/login";
const NOTES_API = "http://localhost:8080/api/v1/kunder/anteckningar";
const SEMESTER_API = "http://localhost:8080/api/v1/semester"

class ApiConnector {
  authenicate(){
    return axios.post(AUTHENTICATION_API)
  }
  
  //Saves the customer to the database
  saveCustomer(customer) {
    return axios.post(CUSTOMER_API_BASE_URL, customer, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getCustomers() {
    //Gets all customers from the database
    return axios.get(CUSTOMER_API_BASE_URL, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getCustomer(customer) {
    //Gets a single customer from the database
    return axios.get(CUSTOMER_API_BASE_URL + "/" + customer, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  deleteCustomer(customer) {
    //Deletes a customer from the database with a specific id
    return axios.delete(CUSTOMER_API_BASE_URL + "/" + customer + "/remove", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  saveWork(customer, work) {
    return axios.post(CUSTOMER_API_BASE_URL + "/" + customer +  "/work/save", work, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getWork() {
    return axios.get(CUSTOMER_API_BASE_URL + "/work", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  changeWork(customer, work) {
    return axios.post(CUSTOMER_API_BASE_URL + "/" + customer + "/work/update/", work, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  deleteWork(customer, work) {
    //Deletes a work from the database with a specific id
    return axios.delete(CUSTOMER_API_BASE_URL + "/" + customer + "/work/delete/" + work, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getUpcomingWork(){
    //Gets upcoming work based on tomorrows date and ten days forward. 
     //Checks if any customer has work with startdate within 10 days.
     return axios.get(CUSTOMER_API_BASE_URL + "/upcoming", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  //Gets ongoing work based on todays date.
  //Checks if any customer has work that has date = todays date
  //Used for updating workStatus
  getOngoingWork(){
    return axios.get(CUSTOMER_API_BASE_URL + "/ongoing", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  findWorkAndUpdateToCompleted() {
    return axios.post(CUSTOMER_API_BASE_URL + "/work/update_workstatus_completed", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  // ACCOUNTING / WARRANTY
  saveWarranty(warranty) {
    //Saves the warranty to the database (Can also update existing warranty if ID already exists)
    return axios.post(ACCOUNTING_API_BASE_URL, warranty, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getWarranties() {
    //Gets existing warranties from the database
    return axios.get(ACCOUNTING_API_BASE_URL, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getWarranty(warranty) {
    //Gets specific warranty from the database
    return axios.get(ACCOUNTING_API_BASE_URL + "/" + warranty, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  deleteWarranty(warranty) {
    //Deletes an existing warranty from the database
    return axios.delete(ACCOUNTING_API_BASE_URL + "/" + warranty + "/remove", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getCalendar() {
    //Gets all existing info about calendar from the database
    return axios.get(CALENDAR_API_BASE_URL + "/work", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getNotes() {
    //Gets all existing info about calendar from the database
    return axios.get(NOTES_API, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  saveSemester(date) {
    return axios.post(SEMESTER_API, date, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getSemester() {
    //Gets all existing info about calendar from the database
    return axios.get(CALENDAR_API_BASE_URL + "/semester", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  deleteSemester(semesterId) {
    //Gets all existing info about calendar from the database
    return axios.delete(SEMESTER_API + "/" + semesterId + "/remove", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  editSemester(semesterId, semester) {
    return axios.post(SEMESTER_API + "/" + semesterId + "/edit", semester, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  saveNote(workId, noteList) {
    return axios.post(CUSTOMER_API_BASE_URL + "/anteckningar/save/" + workId, noteList, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  deleteNote(noteId) { //Skall ej kunna göras?
    console.log(noteId)
    return axios.delete(CUSTOMER_API_BASE_URL + "/anteckningar/remove/" + noteId, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  sumNote(workId, noteSum) {
    return axios.post(NOTES_API + "/summary/save/" + workId, noteSum, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getSummedNotes(customerId) {
    return axios.get(NOTES_API + "/summary/customer/" + customerId, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getOldNotes(workId) {
    return axios.get(NOTES_API + "/notesForWork/summarized/" + workId , {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  editNote(noteId, note) {
    return axios.post(NOTES_API + "/edit/" + noteId, note, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  getUser(user) {
    return axios.get("http://localhost:8080/api/v1/user/" + user, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }

  updateUser(user) {
    return axios.post("http://localhost:8080/api/v1/user/update", user, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    });
  }
}

export default new ApiConnector();
