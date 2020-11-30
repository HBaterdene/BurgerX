import axios from "axios"

const instance = axios.create(
    {
        baseURL: "https://burgerx-3dbfe.firebaseio.com/"
    }
);

export default instance;