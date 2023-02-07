import { baseUrl } from '../variables/Variables';

/*
 * Adapter For Agency API Integration
 *
 *  */

const agencyAdd = async (formData) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));

  var request = {
    agency_name: formData.agencyName,
    agency_brandname: formData.agencyBrandname,
    agency_type: formData.agencyType,
    agency_category: formData.agencyCategory,
    email: formData.agencyEmail,
    phone: formData.agencyPhone,
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
    const fetchResponse = await fetch(baseUrl + `api/addagency`, settings);
    const data = await fetchResponse.json();

    console.log(data);

    return data;
  } catch (e) {
    return e;
  }
};

const agencyEdit = async (formData) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));

  var request = {
    id: formData.agencyId,
    agency_name: formData.agencyName,
    agency_brandname: formData.agencyBrandname,
    agency_type: formData.agencyType,
    agency_category: formData.agencyCategory,
    email: formData.agencyEmail,
    phone: formData.agencyPhone,
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
    const fetchResponse = await fetch(baseUrl + `api/editagency`, settings);
    const data = await fetchResponse.json();

    console.log(fetchResponse);
    return data;
  } catch (e) {
    return e;
  }
};

const getAgency = async () => {
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
    const fetchResponse = await fetch(baseUrl + `api/agencylist`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

export { agencyAdd, agencyEdit, getAgency };
