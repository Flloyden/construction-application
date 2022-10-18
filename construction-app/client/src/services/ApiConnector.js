import axios from "axios";

// Base url to get api
const KUND_API_BASE_URL = "http://localhost:8080/api/v1/kunder"
const ACCOUNTING_API_BASE_URL = "http://localhost:8080/api/v1/bokföring"

class ApiConnector {
    //Saves the "kund" to the database
    saveKund(kund) {
        return axios.post(KUND_API_BASE_URL, kund);
    }

    getKunder() {
        //Gets kunder from the database
        return axios.get(KUND_API_BASE_URL);
    }

    getKund(kund) {
        //Gets single kund from the database
        return axios.get(KUND_API_BASE_URL + "/" + kund);
    }

    deleteKund(kund) {
        //Deletes a kund from the database
        return axios.delete(KUND_API_BASE_URL + "/" + kund + "/remove");
    }

    // ACCOUNTING / WARRANTY
    saveWarranty(warranty)
    {
        //Saves the warranty to the database (Can also update existing warranty if ID already exists)
        return axios.post(ACCOUNTING_API_BASE_URL, warranty);
    }

    getWarranties()
    {
        //Gets existing warranties from the database
        return axios.get(ACCOUNTING_API_BASE_URL);
    }

    getWarranty(warranty)
    {
        //Gets specific warranty from the database
        return axios.get(ACCOUNTING_API_BASE_URL + "/" + warranty)
    }

    deleteWarranty(warranty)
    {
        //Deletes an existing warranty from the database
        return axios.delete(ACCOUNTING_API_BASE_URL + "/" + warranty + "/remove")
    }
}

export default new ApiConnector();