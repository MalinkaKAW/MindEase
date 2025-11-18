import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://dummyjson.com';
const ZENQUOTES_API = 'https://zenquotes.io/api';

interface ApiClient extends AxiosInstance {}

// DummyJSON API client for authentication
export const dummyJsonClient: ApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ZenQuotes API client for meditation quotes
export const zenQuotesClient: ApiClient = axios.create({
  baseURL: ZENQUOTES_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default dummyJsonClient;
