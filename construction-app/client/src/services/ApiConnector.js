import axios from "axios";

// Base url to get api
const KUND_API_BASE_URL = "http://localhost:8080/api/v1/kunder"

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
}

export default new ApiConnector();