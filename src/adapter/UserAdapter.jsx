import { baseUrl } from '../variables/Variables';

/*
 * Adapter For API server
 *
 * List Users returning promises */
const usersList = async (filterData) => {
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
      baseUrl +
        `api/userlist?id=` +
        Suser.user.id +
        `&client_id=` +
        filterData.clientId +
        `&user_type=` +
        filterData.userType +
        ``,
      settings
    );
    const datahttp = await fetchResponse.json();
    console.log(fetchResponse);
    return datahttp;
  } catch (e) {
    return e;
  }
};

const userAdd = async (formData, userRoles) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request = {
    client_id: formData.clientId,
    firstname: formData.firstName,
    lastname: formData.lastName,
    email: formData.email,
    phone: formData.phoneNumber,
    // password: formData.password,
    address: formData.userAddress,
    user_type: formData.userType,
    parent_id: Suser.user.id,
    status: formData.userStatus,
    role_id: userRoles,
  };
  console.log(request);
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/adduser`, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

const userEdit = async (formData, userRoles) => {
  //     var request = formData.id+`?firstname=`+formData.firstname+`&lastname=`+formData.lastname+
  //     `&email=`+formData.email+`&password=`+formData.password+`&phone=`+formData.phone+`&status=`+formData.status+`&user_type=`+formData.user_type+`&address=`+formData.address+`&parent_id=`+Suser.user.id+`&role_id=[`+formData.roles+`]`;
  // console.table(formData)
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request = {
    client_id: formData.clientId,
    firstname: formData.firstName,
    lastname: formData.lastName,
    email: formData.email,
    phone: formData.phoneNumber,
    address: formData.userAddress,
    user_type: formData.userType,
    parent_id: Suser.user.id,
    status: formData.userStatus,
    role_id: userRoles,
  };
  console.log(request);
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/updateuser/` + formData.id + ``,
      settings
    );

    const data = await fetchResponse.json();
    console.log(fetchResponse);
    return data;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};
/* this function returning promises */
const userDelete = async (id) => {
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
    const fetchResponse = await fetch(baseUrl + `api/deleteuser`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

const clientUserList = async (id) => {
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
      baseUrl + `api/clientuserlist/` + id + ``,
      settings
    );

    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

const assignClients = async (clientId, usersTo) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request = {
    client_id: clientId,
    assigned_by: Suser.user.id,
    user_id: usersTo,
  };
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/clientuserassign`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

const getAssignedUsers = async (clientId, subClientId, briefId) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request;
  subClientId === ""
    ? (request = {
        client_id: clientId,
        brief_id: briefId,
        assigned_by: Suser.user.id,
      })
    : (request = {
        sub_clients_id: subClientId,
        brief_id: briefId,
        assigned_by: Suser.user.id,
      });
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/briefassignedusers`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

const assignUsers = async (clientId, subClientId, briefId, manager, users) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  let managerId = manager.map(function (obj) {
    return parseInt(obj.split("~~")[1]);
  });
  var request;

  subClientId === ""
    ? (request = {
        client_id: clientId,
        brief_id: briefId,
        assigned_by: Suser.user.id,
        senior_user: managerId,
        user_id: users,
      })
    : (request = {
        sub_clients_id: subClientId,
        brief_id: briefId,
        assigned_by: Suser.user.id,
        senior_user: managerId,
        user_id: users,
      });

  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  console.log(settings.body);
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/briefuserassign`,
      settings
    );
    const data = await fetchResponse.json();

    console.log(settings.body);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);

    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

const removeAssignedUsers = async (clientId, subClientId, briefId, user) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request;

  subClientId === ""
    ? (request = {
        client_id: clientId,
        brief_id: briefId,
        assigned_by: Suser.user.id,
        user_id: user,
      })
    : (request = {
        sub_clients_id: subClientId,
        brief_id: briefId,
        assigned_by: Suser.user.id,
        user_id: user,
      });

  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/briefusersrevoke`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

const userofclient = async (clientId) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl +
        `api/userofclient?client_id=` +
        clientId +
        `&user_id=` +
        Suser.user.id,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

const sendPassword = async (password, new_password) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  let request = {
    password: password,
    new_password: new_password,
    email: Suser.user.email,
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
    const fetchResponse = await fetch(baseUrl + `api/resetpassword`, settings);
    const datahttp = await fetchResponse.json();
    console.log(datahttp);
    return datahttp;
  } catch (e) {
    return e;
  }
};

const profileEdit = async (formData, userRoles) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request = {
    user_id: Suser.user.id,
    phone: formData.phone,
    address: formData.address,
  };
  console.log(request);
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/editprofile`, settings);

    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};
export {
  userAdd,
  usersList,
  userDelete,
  userEdit,
  clientUserList,
  assignClients,
  getAssignedUsers,
  assignUsers,
  removeAssignedUsers,
  userofclient,
  sendPassword,
  profileEdit,
};
