import axios from "axios";
const BASE_URL = "https://jobboard-system.onrender.com/api";

const getToken = () => localStorage.getItem("accessToken");

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});  
//test
export const fetchJobs = () =>
  axios.get(`${BASE_URL}/jobs/`, { headers: getHeaders() });

export const fetchCompanyJobs = async () => {
  const [jobsRes, companyRes] = await Promise.all([
    axios.get(`${BASE_URL}/jobs/`, { headers: getHeaders() }),
    axios.get(`${BASE_URL}/companies/my/`, { headers: getHeaders() }),
  ]);
  const companyId = companyRes.data.id;
  return jobsRes.data.filter((job) => job.company === companyId);
};

export const fetchMyCompanyId = async () => {
  const res = await axios.get(`${BASE_URL}/companies/my/`, {
    headers: getHeaders(),
  });
  return res.data.id;
};

export const fetchApplications = () =>
  axios.get(`${BASE_URL}/applications/`, { headers: getHeaders() });

export const updateApplicationStatus = (id, status) =>
  axios.patch(
    `${BASE_URL}/applications/${id}/`,
    { status },
    {
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

export const fetchMyApplications = () =>
  axios.get(`${BASE_URL}/applications/my/`, {
    headers: getHeaders(),
  });

export const loginUser = (username, password) =>
  axios.post(`${BASE_URL}/accounts/login/`, {
    username,
    password,
  });

export const registerUser = (formData) =>
  axios.post(`${BASE_URL}/accounts/register/`, formData);

export const submitApplication = (formData) =>
  axios.post(`${BASE_URL}/applications/`, formData, {
    headers: {
      ...getHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

export const createJob = (data) =>
  axios.post(`${BASE_URL}/jobs/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const createCompany = (data) => {
  return axios.post(`${BASE_URL}/companies/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

