import { baseUrl } from '../variables/Variables';

/*
 * Adapter For API server
 *
 * List Client Master returning promises */
const briefMsList = async () => {
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
      baseUrl + `api/briefmasterlist`,
      settings
    );
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

/* Delete Client Master returning promises */
const briefMsDelete = async (id) => {
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
      baseUrl + `api/deletebriefmaster`,
      settings
    );
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

/* Add Client Master returning promises */
const briefMsAdd = async (cmname) => {
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
      baseUrl + `api/addbrieftmaster?name=` + cmname + ``,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};
const briefMsEdit = async (id, cmname) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  let request = { id: id, name: cmname };

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
      baseUrl + `api/updatebriefmaster`,
      settings
    );
    const data = await fetchResponse.json();

    console.log(fetchResponse);
    return data;
  } catch (e) {
    return e;
  }
};

const getAssignedBriefs = async (clientId, subClientId) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request;
  subClientId === ""
    ? (request = { client_id: clientId, assigned_by: Suser.user.id })
    : (request = { sub_clients_id: subClientId, assigned_by: Suser.user.id });
  // var request = { client_id: clientId, assigned_by: Suser.user.id, user_id: usersTo }
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
    const fetchResponse = await fetch(baseUrl + `api/assignedbriefs`, settings);
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

const assignBriefs = async (clientId, subClientId, briefTo) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request;
  subClientId === ""
    ? (request = {
        client_id: clientId,
        assigned_by: Suser.user.id,
        brief_id: briefTo,
      })
    : (request = {
        client_id: clientId,
        sub_clients_id: subClientId,
        assigned_by: Suser.user.id,
        brief_id: briefTo,
      });

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
      baseUrl + `api/clientbriefassign`,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

const removeAssignedBrief = async (clientId, briefId) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));

  // subClientId === ""
  //   ? (request = {
  //       client_id: clientId,
  //       brief_id: briefId,
  //       assigned_by: Suser.user.id,
  //       user_id: user,
  //     })
  let request = {
    client_id: clientId,
    brief_id: briefId,
    assigned_by: Suser.user.id,
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
      baseUrl + `api/clientbriefrevoke`,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

const briefSummaryList = async (filterData) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const userRoll = Suser.user.roles[0].id;
  let request;
  if (userRoll === 1 || userRoll === 2 || userRoll === 19) {
    request = {
      client_id: filterData.clientId,
      month: filterData.month,
      year: filterData.year,
    };
    console.log("briefbelongstoclient request <=>", request);
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
        baseUrl + `api/briefbelongstoclient`,
        settings
      );
      const datahttp = await fetchResponse.json();
      console.log("briefbelongstoclient <=>", datahttp);
      return datahttp;
    } catch (e) {
      return e;
    }
  }
  if (userRoll === 4 || userRoll === 8) {
    request = {
      client_id: filterData.clientId,
      user_id: Suser.user.id,
      month: filterData.month,
      year: filterData.year,
    };
    console.log("briefbelongstouser request <=>", request);
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
        baseUrl + `api/briefbelongstouser`,
        settings
      );
      const datahttp = await fetchResponse.json();
      console.log("briefbelongstouser <=>", datahttp);
      return datahttp;
    } catch (e) {
      return e;
    }
  }
};

const approvedMediaPlan = async (filterData) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const userRoll = Suser.user.roles[0].id;
  let request;
  console.log(request);

  if (userRoll === 1 || userRoll === 2 || userRoll === 19) {
    request = {
      client_id: filterData.clientId,
      month: filterData.month,
      year: filterData.year,
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
        baseUrl + `api/approvedmediaplanclient`,
        settings
      );
      const datahttp = await fetchResponse.json();
      console.log(fetchResponse);
      return datahttp;
    } catch (e) {
      return e;
    }
  }
  if (userRoll === 4 || userRoll === 8) {
    request = {
      client_id: filterData.clientId,
      user_id: Suser.user.id,
      month: filterData.month,
      year: filterData.year,
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
        baseUrl + `api/approvedmediaplanuser`,
        settings
      );
      const datahttp = await fetchResponse.json();
      return datahttp;
    } catch (e) {
      return e;
    }
  }
};

const addBriefData = async (formData, formName, id, month, year, action) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  var request = {
    formTypeName: formName,
    briefmaster_id: parseInt(id),
    client_id: Suser.client.length > 0 ? Suser.client[0].id : "",
    month: month,
    year: year,
    briefFormName: {
      facebook: {
        formtype: "facebook",
        business_name: formData.fbusiness_name,
        objective: formData.fobjective,
        start_date: formData.fstart_date,
        end_date: formData.fend_date,
        target_markets: formData.ftarget_markets,
        customer_type: formData.fcustomer_type,
        keywordtg: formData.fkeywordtg,
        demogarphic_details_age: formData.fdemogarphic_details_age,
        demogarphic_gender: formData.fdemogarphic_gender,
        placement: formData.fplacement,
        detailed_training: formData.fdetailed_training,
        language: formData.flanguage,
        audience_size: formData.faudience_size,
        audience_name: formData.faudience_name,
        matched_base: formData.fmatched_base,
        exclusion_audience_name: formData.fexclusion_audience_name,
        device_targeting: formData.fdevice_targeting,
        existingchannel_facebook: formData.existingchannel_facebook,
        creative_type: formData.fcreative_type,
        any_recomendation: formData.fany_recomendation,
        last_month_learning: formData.flast_month_learning,
        mt_monthly_spend_number: formData.fmt_monthly_spend_number,
        mt_cpop: formData.fmt_cpop,
        mt_daily_spend_number: formData.fmt_daily_spend_number,
        mt_leads: formData.fmt_leads,
        mt_appoitment_sale: formData.fmt_appoitment_sale,
        mt_cpl: formData.fmt_cpl,
        mt_mcp: formData.fmt_mcp,
        mt_cpmcp: formData.fmt_cpmcp,
        mt_cps: formData.fmt_cps,
        mt_kyc: formData.fmt_kyc,
        mt_cpkyc: formData.fmt_cpkyc,
        mt_card: formData.fmt_card,
        mt_cpcard: formData.fmt_cpcard,
        mt_cpa: formData.fmt_cpa,
        mt_cibil: formData.fmt_cibil,
        mt_cpcibil: formData.fmt_cpcibil,
        mt_coa: formData.fmt_coa,
        mt_observation_period_number: formData.fmt_observation_period_number,
        mt_cutoff_metrics_number: formData.fmt_cutoff_metrics_number,
        mt_disbursal_volume: formData.fmt_disbursal_volume,
        mt_onlinepurchase: formData.fmt_onlinepurchase,
        lmp_spend: formData.flmp_spend,
        lmp_leads: formData.flmp_leads,
        lmp_cpcibil: formData.flmp_cpcibil,
        lmp_coa: formData.flmp_coa,
        lmp_appoitment_sale: formData.flmp_appoitment_sale,
        lmp_mcp: formData.flmp_mcp,
        lmp_cpmcp: formData.flmp_cpmcp,
        lmp_cpa: formData.flmp_cpa,
        lmp_kyc: formData.flmp_kyc,
        lmp_cpkyc: formData.flmp_cpkyc,
        lmp_card: formData.flmp_card,
        lmp_cpcard: formData.flmp_cpcard,
        lmp_onlinepurchase: formData.flmp_onlinepurchase,
        lmp_cpl: formData.flmp_cpl,
        lmp_cibil: formData.flmp_cibil,
        lmp_disbursal_volume: formData.flmp_disbursal_volume,
      },
      ...(id === "3"
        ? { google: {} }
        : {
            google: {
              formtype: "google",
              business_name: formData.gbusiness_name,
              objective: formData.gobjective,
              start_date: formData.gstart_date,
              end_date: formData.gend_date,
              target_markets: formData.gtarget_markets,
              customer_type: formData.gcustomer_type,
              keywordtg: formData.gkeywordtg,
              inmarket: formData.ginmarket,
              demogarphic_details_age: formData.gdemogarphic_details_age,
              demogarphic_gender: formData.gdemogarphic_gender,
              household_income: formData.ghousehold_income,
              language: formData.glanguage,
              audience_size: formData.gaudience_size,
              audience_name: formData.gaudience_name,
              matched_base: formData.gmatched_base,
              device_targeting: formData.gdevice_targeting,
              mt_monthly_spend_number: formData.gmt_monthly_spend_number,
              mt_daily_spend_number: formData.gmt_daily_spend_number,
              mt_kyc: formData.gmt_kyc,
              mt_cpkyc: formData.gmt_cpkyc,
              lmp_leads: formData.glmp_leads,
              lmp_spend: formData.glmp_spend,
              lmp_mcp: formData.glmp_mcp,
              lmp_cibil: formData.glmp_cibil,
              lmp_cpcibil: formData.glmp_cpcibil,
              lmp_coa: formData.glmp_coa,
              lmp_disbursal_volume: formData.glmp_disbursal_volume,
              lmp_observation_period_number:
                formData.glmp_observation_period_number,
              lmp_cutoff_metrics_number: formData.glmp_cutoff_metrics_number,
              lmp_appoitment_sale: formData.glmp_appoitment_sale,
              lmp_daily_spend: formData.glmp_daily_spend,
              lmp_cps: formData.glmp_cps,
              lmp_cpl: formData.glmp_cpl,
              lmp_mcp: formData.glmp_mcp,
              lmp_cpmcp: formData.glmp_cpmcp,
              lmp_kyc: formData.glmp_kyc,
              lmp_cpkyc: formData.glmp_cpkyc,
              lmp_card: formData.glmp_card,
              lmp_cpcard: formData.glmp_cpcard,
              ni_cibil: formData.gni_cibil,
              ni_cpcibil: formData.gni_cpcibil,
              ni_coa: formData.gni_coa,
              ni_disbursal_volume: formData.gni_disbursal_volume,
              ni_existingchannel_google: formData.existingchannel_google,
              ni_creative_type: formData.gni_creative_type,
              ni_any_recomendation: formData.gni_any_recomendation,
              ni_cpl: formData.gni_cpl,
              ni_mcp: formData.gni_mcp,
              ni_cpmcp: formData.gni_cpmcp,
              ni_cpa: formData.gni_cpa,
              ni_kyc: formData.gni_kyc,
              ni_cpkyc: formData.gni_cpkyc,
              ni_card: formData.gni_card,
              ni_cpcard: formData.gni_cpcard,
            },
          }),
      ...(id === "3" || id === "5" || id === "6" || id === "7"
        ? { bing: {} }
        : {
            bing: {
              formtype: "bing",
              business_name: formData.bbusiness_name,
              objective: formData.bobjective,
              start_date: formData.bstart_date,
              end_date: formData.bend_date,
              target_markets: formData.btarget_markets,
              customer_type: formData.bcustomer_type,
              keywordtg: formData.bkeywordtg,
              inmarket: formData.binmarket,
              demogarphic_details_age: formData.bdemogarphic_details_age,
              demogarphic_gender: formData.bdemogarphic_gender,
              household_income: formData.bhousehold_income,
              device_targeting: formData.bdevice_targeting,
              language: formData.blanguage,
              audience_size: formData.baudience_size,
              audience_name: formData.baudience_name,
              matched_base: formData.bmatched_base,
              mt_monthly_spend_number: formData.bmt_monthly_spend_number,
              lmp_leads: formData.blmp_leads,
              lmp_spend: formData.blmp_spend,
              lmp_mcp: formData.blmp_mcp,
              lmp_cibil: formData.blmp_cibil,
              lmp_cpcibil: formData.blmp_cpcibil,
              lmp_coa: formData.blmp_coa,
              lmp_disbursal_volume: formData.blmp_disbursal_volume,
              lmp_observation_period_number:
                formData.blmp_observation_period_number,
              lmp_cutoff_metrics_number: formData.blmp_cutoff_metrics_number,
              creative_type: formData.bcreative_type,
              lmp_kyc: formData.blmp_kyc,
              lmp_cpkyc: formData.blmp_cpkyc,
              lmp_card: formData.blmp_card,
              lmp_cpcard: formData.blmp_cpcard,
            },
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
    let fetchResponse;
    if (action === "edit") {
      fetchResponse = await fetch(baseUrl + `api/updatebriefdata`, settings);
    } else {
      fetchResponse = await fetch(baseUrl + `api/addbriefdata`, settings);
    }
    const data = await fetchResponse.json();
    console.log("fetch api call header =>", fetchResponse);
    console.log("brief crud response ==>", data);
    return data;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

const briefCall = async (request) => {
  console.log(request);
  var Suser = JSON.parse(localStorage.getItem("userIn"));

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
      baseUrl + `api/briefcallstatus`,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

const mediaPlanUpload = async (client_id, brief_id, file, month, year) => {
  var data = JSON.stringify({ client_id, brief_id, month, year });
  console.log(data);
  const formData = new FormData();

  formData.append("data", data);
  formData.append("file", file);
  var Suser = JSON.parse(localStorage.getItem("userIn"));

  const settings = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      // Accept: "application/json",
      // "Content-Type": "application/json",
    },
    body: formData,
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `api/mediaplanupload`,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

const briefHistory = async (request) => {
  console.log(request);
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
        `api/briefstatushistory?client_id=` +
        request.client_id +
        `&brief_id=` +
        request.brief_id,
      settings
    );
    const data = await fetchResponse.json();
    console.log(fetchResponse);
    return data;
  } catch (e) {
    return e;
  }
};
const getBriefData = async (client_id, brief_id, month, year) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  let request = {
    client_id: client_id,
    brief_id: brief_id,
    month: month,
    year: year,
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
    const fetchResponse = await fetch(baseUrl + `api/briefedit`, settings);
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

const briefNumbers = async () => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  let request = { user_id: Suser.user.id };
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
      baseUrl + `api/briefdashboarddata`,
      settings
    );
    const data = await fetchResponse.json();
    // console.log(fetchResponse);
    return data;
  } catch (e) {
    return e;
  }
};

const monthWiseBriefNumbers = async () => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  let request = { user_id: Suser.user.id };
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
      baseUrl + `api/briefmonthlychardata`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
    console.log(data);
  } catch (e) {
    console.log(e);
    return e;
  }
};

const getMediaPlan = async (brief_id, client_id, month, year) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  let request = {
    brief_id: brief_id,
    client_id: client_id,
    month: month,
    year: year,
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
    const fetchResponse = await fetch(baseUrl + `api/getmediaplan`, settings);
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

export {
  briefMsList,
  briefMsDelete,
  briefMsAdd,
  briefMsEdit,
  getAssignedBriefs,
  assignBriefs,
  removeAssignedBrief,
  briefSummaryList,
  addBriefData,
  briefCall,
  mediaPlanUpload,
  briefHistory,
  approvedMediaPlan,
  getBriefData,
  briefNumbers,
  monthWiseBriefNumbers,
  getMediaPlan,
};
