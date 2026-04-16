import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL;

const postData = async (url: string, body: any) => {
  try {
    const response = await axios.post(`${serverURL}/${url}`, body);
    const result = response.data;
    return result;
  } catch (e) {
    return null;
  }
};

const getData = async (url: string) => {
  try {
    const response = await axios.get(`${serverURL}/${url}`);
    const result = response.data;
    return result;
  } catch (e) {
    return null;
  }
};

export { serverURL, postData, getData };
