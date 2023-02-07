import { baseUrl } from '../variables/Variables';

/*
 * Adapter For API server
 *
 * List Client Master returning promises */
const clientMsList = async () => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/clientmasterlist`,
      settings
    );
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

/* Delete Client Master returning promises */
const clientMsDelete = async (id) => {
  var suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/deleteclientmaster`,
      settings
    );
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
const clientMsAdd = async (cmname) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/addclientmaster?name=` + cmname + ``,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};
const clientMsEdit = async (id, cmname) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/updateclientmaster/` + id + `?name=` + cmname + ``,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

export { clientMsList, clientMsDelete, clientMsAdd, clientMsEdit };
