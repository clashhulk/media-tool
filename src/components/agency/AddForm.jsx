import 'react-toastify/dist/ReactToastify.css';

import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { agencyAdd, agencyEdit, getAgency } from '../../adapter/AgencyAdapter';
import FristStep from './FristStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

// import { cientInputs } from "../../variables/Variables";
function Form(props) {
  const [editData, setEditData] = useState({});
  const [formIsValid, setformIsValid] = useState(0);
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState("view");

  const [formData, setFormData] = useState(
    editData
      ? editData.id
        ? {
            agencyName: editData.agency_name,
            agencyBrandname: editData.agency_brandname,
            agencyType: editData.agency_type,
            agencyEstimatemode: editData.agency_estimate_mode,
            agencyCategory: editData.agency_category,
            agencyEmail: editData.email,
            agencyPhone: editData.phone,
            clientCode: editData.client_code,
            websiteAddress: editData.website_address,
            description: editData.description,
            status: editData.status,

            /* step 2 */
            address1: editData.address,
            address2: editData.address1,
            country: editData.country,
            state: editData.state,
            city: editData.city,
            pincode: String(editData.pincode),
            /* step 3 */
            cin: editData.cin,
            tan: editData.tan,
            pan: editData.pan,
            gstNumber: editData.gst_number,
          }
        : {
            /* step 1 */
            // parent: "",
            // client_master_id: "",
            // clientId: "",
            agencyName: "",
            agencyBrandname: "",
            agencyType: "",
            agencyEstimatemode: "",
            agencyCategory: "",
            agencyEmail: "",
            agencyPhone: "",
            clientCode: "",
            websiteAddress: "",
            description: "",
            status: "2",

            /* step 2 */
            address1: "",
            address2: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            /* step 3 */
            cin: "",
            tan: "",
            pan: "",
            gstNumber: "",

            // hClientStatus: "1",
            // hFirstName: "",
            // hLastName: "",
            // hEmail: "",
            // hPhoneNumber: "",
            // hClientAddress: "",
          }
      : {
          /* step 1 */
          // parent: "",
          // client_master_id: "",
          // clientId: "",
          agencyName: "",
          agencyBrandname: "",
          agencyType: "",
          agencyEstimatemode: "",
          agencyCategory: "",
          agencyEmail: "",
          agencyPhone: "",
          clientCode: "",
          websiteAddress: "",
          description: "",
          status: "1",

          /* step 2 */
          address1: "",
          address2: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          /* step 3 */
          cin: "",
          tan: "",
          pan: "",
          gstNumber: "",

          // hClientStatus: "1",
          // hFirstName: "",
          // hLastName: "",
          // hEmail: "",
          // hPhoneNumber: "",
          // hClientAddress: "",
        }
  );
  // useEffect(() => {
  //   if (!editData) {
  //     return;
  //   }
  //   let response3 = clientUserList(editData.id);
  //   response3.then(function (result) {
  //     if (result.status === "Success") {
  //       setFormData({
  //         ...formData,
  //         hId: result.data.user_assigned[0].id,
  //         hFirstName: result.data.user_assigned[0].firstname,
  //         hLastName: result.data.user_assigned[0].lastname,
  //         hEmail: result.data.user_assigned[0].email,
  //         hPhoneNumber: result.data.user_assigned[0].phone,
  //         hClientAddress: result.data.user_assigned[0].address,
  //         hClientStatus: result.data.user_assigned[0].status,
  //       });
  //     } else {
  //       console.warn("failed to get client head Data");
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const responce = getAgency(formData);
    setLoading(true);

    responce.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        setFormData(
          result.data[0]
            ? result.data[0].id
              ? {
                  agencyId: result.data[0].id,
                  agencyName: result.data[0].agency_name,
                  agencyBrandname: result.data[0].agency_brandname,
                  agencyType: result.data[0].agency_type,
                  agencyEstimatemode: result.data[0].agency_estimate_mode,
                  agencyCategory: result.data[0].agency_category,
                  agencyEmail: result.data[0].email,
                  agencyPhone: result.data[0].phone,
                  clientCode: result.data[0].client_code,
                  websiteAddress: result.data[0].website_address,
                  description: result.data[0].description,
                  status: result.data[0].status,

                  /* step 2 */
                  address1: result.data[0].address,
                  address2: result.data[0].address1,
                  country: result.data[0].country,
                  state: result.data[0].state,
                  city: result.data[0].city,
                  pincode: String(result.data[0].pincode),
                  /* step 3 */
                  cin: result.data[0].cin,
                  tan: result.data[0].tan,
                  pan: result.data[0].pan,
                  gstNumber: result.data[0].gst_number,

                  // hClientStatus: "1",
                  // hFirstName: "",
                  // hLastName: "",
                  // hEmail: "",
                  // hPhoneNumber: "",
                  // hClientAddress: "",
                }
              : {
                  /* step 1 */
                  // parent: "",
                  // client_master_id: "",
                  // clientId: "",
                  agencyName: "",
                  agencyBrandname: "",
                  agencyType: "",
                  agencyEstimatemode: "",
                  agencyCategory: "",
                  agencyEmail: "",
                  agencyPhone: "",
                  clientCode: "",
                  websiteAddress: "",
                  description: "",
                  status: "2",

                  /* step 2 */
                  address1: "",
                  address2: "",
                  country: "",
                  state: "",
                  city: "",
                  pincode: "",
                  /* step 3 */
                  cin: "",
                  tan: "",
                  pan: "",
                  gstNumber: "",

                  // hClientStatus: "1",
                  // hFirstName: "",
                  // hLastName: "",
                  // hEmail: "",
                  // hPhoneNumber: "",
                  // hClientAddress: "",
                }
            : {
                /* step 1 */
                // parent: "",
                // client_master_id: "",
                // clientId: "",
                agencyName: "",
                agencyBrandname: "",
                agencyType: "",
                agencyEstimatemode: "",
                agencyCategory: "",
                agencyEmail: "",
                agencyPhone: "",
                clientCode: "",
                websiteAddress: "",
                description: "",
                status: "1",

                /* step 2 */
                address1: "",
                address2: "",
                country: "",
                state: "",
                city: "",
                pincode: "",
                /* step 3 */
                cin: "",
                tan: "",
                pan: "",
                gstNumber: "",

                // hClientStatus: "1",
                // hFirstName: "",
                // hLastName: "",
                // hEmail: "",
                // hPhoneNumber: "",
                // hClientAddress: "",
              }
        );
        setEditData(result.data[0]);
      } else {
        toast.error(
          JSON.stringify(result.message)
            .replace(/]|{|}/g, " ")
            .replace("[", " ")
        );
      }
    });
  }, []);
  var navigate = useNavigate();
  const FormTitles = [
    "Agency Details",
    "Address Details",
    "ID Details",
    // "Client Head",
  ];
  const [loading, setLoading] = useState(false);
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <FristStep
          formData={formData}
          setFormData={setFormData}
          validation={formIsValid}
          setvalidation={setformIsValid}
        />
      );
    } else if (page === 1) {
      return (
        <SecondStep
          formData={formData}
          setFormData={setFormData}
          validation={formIsValid}
          setvalidation={setformIsValid}
        />
      );
    } else {
      return (
        <ThirdStep
          formData={formData}
          setFormData={setFormData}
          validation={formIsValid}
          setvalidation={setformIsValid}
        />
      );
    }
    //  else {
    //   return (
    //     <FourthStep
    //       formData={formData}
    //       setFormData={setFormData}
    //       validation={formIsValid}
    //       setvalidation={setformIsValid}
    //     />
    //   );
    // }
  };
  const submitStepForm = () => {
    if (page === FormTitles.length - 1) {
      console.log(editData);
      if (editData !== undefined) {
        const responce = agencyEdit(formData);
        setLoading(true);
        responce.then(function (result) {
          setLoading(false);
          if (result.status === "Success") {
            navigate("/dashboard");
            toast.success(result.message);
          } else {
            toast.error(
              JSON.stringify(result.message)
                .replace(/]|{|}/g, " ")
                .replace("[", " ")
            );
          }
        });
      } else {
        const responce = agencyAdd(formData);
        setLoading(true);
        responce.then(function (result) {
          setLoading(false);
          if (result.status === "Success") {
            navigate("/dashboard");
            toast.success(result.message);
          } else {
            toast.error(
              JSON.stringify(result.message)
                .replace(/]|{|}/g, " ")
                .replace("[", " ")
            );
          }
        });
      }
    } else {
      setPage((currPage) => currPage + 1);
    }
  };
  return (
    <div>
      {mode === "view" && editData ? (
        <div className="view-box">
          <h2 className="component-title"> Agency Details </h2>
          <div className="view-box-itemcontainer">
            <div className="infoItem-view">
              <p className="infoLable">Agency name </p>
              <p className="infoContent">{editData.agency_name}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency brandname </p>
              <p className="infoContent">{editData.agency_brandname}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency type </p>
              <p className="infoContent">{editData.agency_type}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Estimate mode </p>
              <p className="infoContent">{editData.agency_estimate_mode}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency category </p>
              <p className="infoContent">{editData.agency_category}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency email </p>
              <p className="infoContent">{editData.email}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency phone no </p>
              <p className="infoContent">{editData.phone}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency code </p>
              <p className="infoContent">{editData.client_code}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Website address </p>
              <p className="infoContent">{editData.website_address}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency description </p>
              <p className="infoContent">{editData.description}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Status</p>
              <p className="infoContent">{editData.status}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency email </p>
              <p className="infoContent">{editData.email}</p>
            </div>
          </div>
          <div className="view-box-itemcontainer">
            <div className="infoItem-view">
              <p className="infoLable">Agency address </p>
              <p className="infoContent">{editData.address}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Agency 2nd address </p>
              <p className="infoContent">{editData.address1}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Country </p>
              <p className="infoContent">{editData.country}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">State </p>
              <p className="infoContent">{editData.state}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">City </p>
              <p className="infoContent">{editData.city}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">Pincode </p>
              <p className="infoContent">{editData.pincode}</p>
            </div>
          </div>
          <div className="view-box-itemcontainer">
            <div className="infoItem-view">
              <p className="infoLable">CIN </p>
              <p className="infoContent">{editData.cin}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">TAN </p>
              <p className="infoContent">{editData.tan}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">PAN </p>
              <p className="infoContent">{editData.pan}</p>
            </div>
            <div className="infoItem-view">
              <p className="infoLable">GST </p>
              <p className="infoContent">{editData.gst_number}</p>
            </div>
          </div>
          <div className="view-box-itemcontainer">
            <ButtonGroup disableElevation variant="contained">
              <Button
                // startIcon={<SaveIcon />}
                disabled={loading}
                className={loading ? "prev" : "button-custom"}
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => {
                  setMode("0");
                }}>
                Edit
                {loading && (
                  <CircularProgress className="buttonLoading" size={16} />
                )}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ) : (
        <div className="form-main-model">
          {editData ? (
            <h2 className="component-title">Edit Agency</h2>
          ) : (
            <h2 className="component-title">Add Agency Details</h2>
          )}
          <ToastContainer />
          <div className="progressbar">
            <div
              style={{
                width:
                  page === 0
                    ? "33%"
                    : page === 1
                    ? "66%"
                    : page === 2
                    ? "100%"
                    : "100%",
              }}
            />
          </div>
          <div className="form-container">
            {/* <div className="header">
						<p>{FormTitles[page]}</p>
					</div> */}
            <div className="body">{PageDisplay()}</div>
            <div className="stepForm">
              <div className="formItem">
                <div className="custom-button-group">
                  <Button
                    disabled={page === 0}
                    className={`'' ${
                      page === 0 ? "prev" : "button-custom nex"
                    }`}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setPage((currPage) => currPage - 1);
                      // setformIsValid(1)
                    }}>
                    Prev
                  </Button>
                  <Button
                    disabled={formIsValid === 0 || loading}
                    className={`'' ${
                      formIsValid === 0 || loading
                        ? "prev"
                        : "button-custom nex"
                    }`}
                    form="my-form"
                    color="secondary"
                    variant="contained"
                    type="submit"
                    onClick={submitStepForm}>
                    {page === FormTitles.length - 1 ? "Submit" : "Next"}
                    {loading && (
                      <CircularProgress className="buttonLoading" size={16} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
