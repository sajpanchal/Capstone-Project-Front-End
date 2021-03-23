import envConfig from "../config";

const env = process.env.NODE_ENV || "development";
const useConfig = envConfig[env];

var API_BASE_URL = useConfig.NODE_APP_BASE_URL;
console.log(`API_BASE_URL is ${API_BASE_URL}`);

export default API_BASE_URL;
