import Axios from "axios";
import { toast } from "sonner";

export const ourAxios = Axios.create();

ourAxios.interceptors.response.use(
  (response) => {
    toast.success(response.statusText || "OK");
    console.log(response);
    // await new Promise((re: any) => setTimeout(re, 4000))
    return response;
  },
  (error) => {
    const message =
      error?.response?.data?.error || error?.message || "Error occurred";
    toast.success(message);
    console.log(error);
    return Promise.reject(error);
  }
);
