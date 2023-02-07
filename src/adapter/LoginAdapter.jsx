import { baseUrl } from '../variables/Variables';

/*
 * Adapter For User login
 *
 * Loginadapter  returning promises */
const Loginadapter = async (da) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(da),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/login`, settings);
    const data = await fetchResponse.json();
    if (data.status === "Success") {
      localStorage.setItem("userIn", JSON.stringify(data.data));
      return data;
    } else {
      return data;
    }
  } catch (e) {
    return e;
  }
};

const emailVerification = async (email) => {
  let request = {
    email: email,
    url: window.location.origin + "/ResetPassword",
  };
  console.log(request);
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer ",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/forgetpassword`, settings);
    const datahttp = await fetchResponse.json();
    console.log(fetchResponse);
    return datahttp;
  } catch (e) {
    return e;
  }
};

const sendPassword = async (password, token) => {
  let request = {
    password: password,
    token: token,
  };
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer ",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/setpassword`, settings);
    const datahttp = await fetchResponse.json();
    console.log(datahttp);
    return datahttp;
  } catch (e) {
    return e;
  }
};
export { Loginadapter, emailVerification, sendPassword };
