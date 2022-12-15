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
    return axios.post(CUSTOMER_API_BASE_URL + "/" + customer +  "/work/save", work)
  }

  getWork() {
    return axios.get(CUSTOMER_API_BASE_URL + "/work")
  }

  changeWork(customer, work) {
    return axios.post(CUSTOMER_API_BASE_URL + "/" + customer + "/work/update/", work)
  }

  deleteWork(customer, work) {
    //Deletes a work from the database with a specific id
    return axios.delete(CUSTOMER_API_BASE_URL + "/" + customer + "/work/delete/" + work);
  }

  getUpcomingWork(){
    //Gets upcoming work based on tomorrows date and ten days forward. 
     //Checks if any customer has work with startdate within 10 days.
     return axios.get(CUSTOMER_API_BASE_URL + "/upcoming");
  }

  //Gets ongoing work based on todays date.
  //Checks if any customer has work that has date = todays date
  getOngoingWork(){
    return axios.get(CUSTOMER_API_BASE_URL + "/ongoing");
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
    return axios.post(SEMESTER_API, date)
  }

  getSemester() {
    //Gets all existing info about calendar from the database
    return axios.get(CALENDAR_API_BASE_URL + "/semester");
  }

  deleteSemester(semesterId) {
    //Gets all existing info about calendar from the database
    return axios.delete(SEMESTER_API + "/" + semesterId + "/remove");
  }

  editSemester(semesterId, semester) {
    return axios.post(SEMESTER_API + "/" + semesterId + "/edit", semester)
  }

  saveNote(workId, noteList) {
    return axios.post(CUSTOMER_API_BASE_URL + "/anteckningar/save/" + workId, noteList)
  }

  deleteNote(noteId) { //Skall ej kunna göras?
    console.log(noteId)
    return axios.delete(CUSTOMER_API_BASE_URL + "/anteckningar/remove/" + noteId)
  }

  sumNote(workId, noteSum) {
    return axios.post(NOTES_API + "/summary/save/" + workId, noteSum)
  }

  getSummedNotes(customerId) {
    return axios.get(NOTES_API + "/summary/customer/" + customerId)
  }

  getOldNotes(workId) {
    return axios.get(NOTES_API + "/notesForWork/summarized/" + workId )
  }

  editNote(noteId, note) {
    return axios.post(NOTES_API + "/edit/" + noteId, note)
  }
}

export default new ApiConnector();
