import { baseUrl } from '../variables/Variables';

const userRoles = async () => {
  var suser = JSON.parse(localStorage.getItem("userIn"));
  if (suser === null) {
    return 0;
  }
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/rolelist`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
const roleDelete = async (id) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, assign_by: Suser.user.id }),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/deleterole`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
const roleAdd = async (rname) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: rname, assign_by: Suser.user.id }),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/addrole`, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};
const roleEdit = async (id, rname) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, name: rname, assign_by: Suser.user.id }),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/editrole`, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

const userPermissions = async () => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  if (Suser === null) {
    return 0;
  }
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assign_by: Suser.user.id }),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/permissionlist`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

const modulesWithPermissions = async () => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  if (Suser === null) {
    return 0;
  }
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assign_by: Suser.user.id }),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/modulelist`, settings);
    const datahttp = await fetchResponse.json();
    console.log(datahttp);
    return datahttp;
  } catch (e) {
    return e;
  }
};

export {
  userRoles,
  roleDelete,
  roleAdd,
  roleEdit,
  userPermissions,
  modulesWithPermissions,
};
