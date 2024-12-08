import axios, { AxiosRequestConfig, Method } from "axios";

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface RequestCofig {
  endpoint: string;
  method: Method;
  data?: LoginBody | RegisterBody;
  headers?: Record<string, string>;
}

export const axiosRequest = async ({
  endpoint,
  method,
  data,
  headers,
}: RequestCofig) => {
  try {
    const config: AxiosRequestConfig = {
      url: `http://localhost:3001/${endpoint}`,
      method,
      data,
      headers,
    };

    const response = await axios(config);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data);
    } else if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("An unexpected error occurred", error);
    }
    throw error;
  }
};
