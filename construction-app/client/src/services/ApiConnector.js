import axios from "axios";

// Base url to get api
const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/kunder";
const ACCOUNTING_API_BASE_URL = "http://localhost:8080/api/v1/bokföring";
const CALENDAR_API_BASE_URL = "http://localhost:8080/api/v1/kalender";

class ApiConnector {
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

  saveWork(customer){
    return axios.post(CUSTOMER_API_BASE_URL + "/work/save", customer)
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
    return axios.get(CALENDAR_API_BASE_URL);
  }
}

export default new ApiConnector();
