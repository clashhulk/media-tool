import { baseUrl } from '../variables/Variables';

const clientList = async () => {
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
    const fetchResponse = await fetch(baseUrl + `api/clientlist`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
const clientAdd = async (formData) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));

  if (formData.parent === "yes") {
    var request = {
      clients: {
        client_master_id: formData.client_master_id,
        company_name: formData.companyName,
        company_brandname: formData.companyBrandname,
        company_type: formData.companyType,
        company_estimate_mode: formData.companyEstimatemode,
        company_category: formData.companyCategory,
        email: formData.companyEmail,
        phone: formData.companyPhone,
        client_code: formData.clientCode,
        cin: formData.cin,
        pan: formData.pan,
        tan: formData.tan,
        gst_number: formData.gstNumber,
        website_address: formData.websiteAddress,
        address: formData.address1,
        address1: formData.address2,
        description: formData.description,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        status: formData.status,
      },
      client_head: {
        firstname: formData.hFirstName,
        lastname: formData.hLastName,
        email: formData.hEmail,
        phone: formData.hPhoneNumber,
        address: formData.hClientAddress,
        user_type: "External",
        parent_id: Suser.user.id,
        status: formData.hClientStatus,
        role_id: 19,
      },
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
      const fetchResponse = await fetch(baseUrl + `api/addclient`, settings);
      const data = await fetchResponse.json();
      console.table(data);
      return data;
    } catch (e) {
      return e;
    }
  } else {
    var request = {
      clients: {
        client_id: formData.clientId,
        company_name: formData.companyName,
        company_brandname: formData.companyBrandname,
        company_type: formData.companyType,
        company_estimate_mode: formData.companyEstimatemode,
        company_category: formData.companyCategory,
        email: formData.companyEmail,
        phone: formData.companyPhone,
        client_code: formData.clientCode,
        cin: formData.cin,
        pan: formData.pan,
        tan: formData.tan,
        gst_number: formData.gstNumber,
        website_address: formData.websiteAddress,
        address: formData.address1,
        address1: formData.address2,
        description: formData.description,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        status: formData.status,
      },
      client_head: {
        ...(formData.hId !== "" && { id: formData.hId }),
        ...(formData.hId === "" && {
          id: "",
          firstname: formData.hFirstName,
          lastname: formData.hLastName,
          email: formData.hEmail,
          phone: formData.hPhoneNumber,
          address: formData.hClientAddress,
          user_type: "External",
          parent_id: Suser.user.id,
          status: formData.hClientStatus,
          role_id: 19,
        }),
      },
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
      const fetchResponse = await fetch(baseUrl + `api/addsubclient`, settings);

      const data = await fetchResponse.json();
      console.table(data);
      return data;
    } catch (e) {
      return e;
    }
  }
};

const clientEdit = async (formData) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  // if (formData.parent === "yes") {
  var request = {
    clients: {
      client_id: formData.client_master_id,
      company_name: formData.companyName,
      company_brandname: formData.companyBrandname,
      company_type: formData.companyType,
      company_estimate_mode: formData.companyEstimatemode,
      company_category: formData.companyCategory,
      email: formData.companyEmail,
      phone: formData.companyPhone,
      client_code: formData.clientCode,
      cin: formData.cin,
      pan: formData.pan,
      tan: formData.tan,
      gst_number: formData.gstNumber,
      website_address: formData.websiteAddress,
      address: formData.address1,
      address1: formData.address2,
      description: formData.description,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      status: formData.status,
    },
    client_head: {
      userid: formData.hId,
      firstname: formData.hFirstName,
      lastname: formData.hLastName,
      email: formData.hEmail,
      phone: formData.hPhoneNumber,
      address: formData.hClientAddress,
      user_type: "External",
      parent_id: Suser.user.id,
      status: formData.hClientStatus,
      role_id: 19,
    },
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
      baseUrl + `api/updateclient/` + formData.clientId,
      settings
    );

    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
  // } else {
  //   var request = {
  //     clients: {
  //       client_id: formData.clientId,
  //       company_name: formData.companyName,
  //       company_brandname: formData.companyBrandname,
  //       company_type: formData.companyType,
  //       company_estimate_mode: formData.companyEstimatemode,
  //       company_category: formData.companyCategory,
  //       email: formData.companyEmail,
  //       phone: formData.companyPhone,
  //       client_code: formData.clientCode,
  //       cin: formData.cin,
  //       pan: formData.pan,
  //       tan: formData.tan,
  //       gst_number: formData.gstNumber,
  //       website_address: formData.websiteAddress,
  //       address: formData.address1,
  //       address1: formData.address2,
  //       description: formData.description,
  //       country: formData.country,
  //       state: formData.state,
  //       city: formData.city,
  //       pincode: formData.pincode,
  //       status: formData.status,
  //     },
  //     client_head: {
  //       ...(formData.hId !== "" && { id: formData.hId }),
  //       ...(formData.hId === "" && {
  //         id: "",
  //         firstname: formData.hFirstName,
  //         lastname: formData.hLastName,
  //         email: formData.hEmail,
  //         phone: formData.hPhoneNumber,
  //         address: formData.hClientAddress,
  //         user_type: "External",
  //         parent_id: Suser.user.id,
  //         status: formData.hClientStatus,
  //         role_id: 19,
  //       }),
  //     },
  //   };

  //   console.log(request);
  //   const settings = {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + Suser.token + "",
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(request),
  //   };
  //   try {
  //     const fetchResponse = await fetch(
  //       baseUrl + `api/updateclient/` + formData.clientId,
  //       settings
  //     );

  //     const data = await fetchResponse.json();
  //     console.log(data);
  //     return data;
  //   } catch (e) {
  //     return e;
  //   }
  // }
};

/* this function returning promises */
const clientDelete = async (id) => {
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
    const fetchResponse = await fetch(baseUrl + `api/deleteclient`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

const countriesList = async () => {
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
    const fetchResponse = await fetch(baseUrl + `api/getCountries`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

const stateList = async (id) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country_id: id }),
  };

  try {
    const fetchResponse = await fetch(baseUrl + `api/getStates`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

export {
  clientAdd,
  clientList,
  clientDelete,
  clientEdit,
  countriesList,
  stateList,
};
