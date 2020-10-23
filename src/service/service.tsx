import axios from "axios";

export const getApi = async (setData: any) => {
  const url = "http://localhost:8081/get-bst-data";

  return axios.get(url).then(
    (response) => {
      setData(response.data);
      console.log(response);
      return response.data;
    },
    (err) => {
      throw err;
    }
  );
};
