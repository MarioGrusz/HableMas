import axios from "axios";

const apiRequest = async (url, method, token = null, data = null, params = null) => {
  
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        
        if (params) {
            config.params = params;
        };

        const response = await axios({
            method: method,
            url: url,
            data: data,
            ...config
        });
        return response.data;
    } catch (error) {
        throw new Error("There is an error with fetching data");
    }
};

export default apiRequest