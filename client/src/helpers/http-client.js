import axios from "axios";

const practiceApi = axios.create({
  baseURL: "https://h8-phase2-gc.vercel.app/",
});

export default practiceApi;
