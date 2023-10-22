import axios from "axios";

axios.defaults.baseURL = "https://6508107256db83a34d9bae62.mockapi.io";

export const fetchProducts = async () => {
    const result = await axios.get("/products");
    return result.data;
};
