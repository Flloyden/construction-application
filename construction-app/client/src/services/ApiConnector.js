import axios from "axios";

const KUND_API_BASE_URL = "http://localhost:8080/api/v1/kunder"

class ApiConnector {
    saveKund(kund) {
        return axios.post(KUND_API_BASE_URL, kund);
    }

    getKund() {
        return axios.get(KUND_API_BASE_URL);
    }
}

export default new ApiConnector();