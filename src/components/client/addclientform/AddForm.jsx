import './form.css';
import 'react-toastify/dist/ReactToastify.css';

import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { clientAdd, clientEdit } from '../../../adapter/ClientAdapter';
import { clientUserList } from '../../../adapter/UserAdapter';
import FourthStep from './FourthStep';
import FristStep from './FristStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

// import { cientInputs } from "../../../variables/Variables";
function Form(props) {
  const editData = props.editData;
  const [formIsValid, setformIsValid] = useState(0);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState(
    editData
      ? editData.state
        ? {
            /* step 1 */
            parent: "yes",
            client_master_id: editData.state.client_master_id,
            clientId: editData.state.id,
            companyName: editData.state.company_name,
            companyBrandname: editData.state.company_brandname,
            companyType: editData.state.company_type,
            companyEstimatemode: editData.state.company_estimate_mode,
            companyCategory: editData.state.company_category,
            companyEmail: editData.state.email,
            companyPhone: editData.state.phone,
            clientCode: editData.state.client_code,
            websiteAddress: editData.state.website_address,
            description: editData.state.description,
            status: editData.state.status,

            /* step 2 */
            address1: editData.state.address,
            address2: editData.state.address1,
            country: editData.state.country,
            state: editData.state.state,
            city: editData.state.city,
            pincode: String(editData.state.pincode),
            /* step 3 */
            cin: editData.state.cin,
            tan: editData.state.tan,
            pan: editData.state.pan,
            gstNumber: editData.state.gst_number,

            hClientStatus: "1",
            hFirstName: "",
            hLastName: "",
            hEmail: "",
            hPhoneNumber: "",
            hClientAddress: "",
          }
        : {
            /* step 1 */
            parent: "",
            client_master_id: "",
            clientId: "",
            companyName: "",
            companyBrandname: "",
            companyType: "",
            companyEstimatemode: "",
            companyCategory: "",
            companyEmail: "",
            companyPhone: "",
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

            hClientStatus: "1",
            hFirstName: "",
            hLastName: "",
            hEmail: "",
            hPhoneNumber: "",
            hClientAddress: "",
          }
      : {
          /* step 1 */
          parent: "",
          client_master_id: "",
          clientId: "",
          companyName: "",
          companyBrandname: "",
          companyType: "",
          companyEstimatemode: "",
          companyCategory: "",
          companyEmail: "",
          companyPhone: "",
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

          hClientStatus: "1",
          hFirstName: "",
          hLastName: "",
          hEmail: "",
          hPhoneNumber: "",
          hClientAddress: "",
        }
  );
  useEffect(() => {
    if (!editData) {
      return;
    }
    let response3 = clientUserList(editData.state.id);
    response3.then(function (result) {
      if (result.status === "Success") {
        setFormData({
          ...formData,
          hId: result.data.user_assigned[0].id,
          hFirstName: result.data.user_assigned[0].firstname,
          hLastName: result.data.user_assigned[0].lastname,
          hEmail: result.data.user_assigned[0].email,
          hPhoneNumber: result.data.user_assigned[0].phone,
          hClientAddress: result.data.user_assigned[0].address,
          hClientStatus: result.data.user_assigned[0].status,
        });
      } else {
        console.warn("failed to get client head Data");
      }
    });
  }, []);

  var navigate = useNavigate();
  const FormTitles = [
    "Company Details",
    "Address Details",
    "ID Details",
    "Client Head",
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
    } else if (page === 2) {
      return (
        <ThirdStep
          formData={formData}
          setFormData={setFormData}
          validation={formIsValid}
          setvalidation={setformIsValid}
        />
      );
    } else {
      return (
        <FourthStep
          formData={formData}
          setFormData={setFormData}
          validation={formIsValid}
          setvalidation={setformIsValid}
        />
      );
    }
    // } else if (page === 4) {
    //   return <FifthStep formData={formData} setFormData={setFormData} />;
    // } else {
    //   return <SixthStep formData={formData} setFormData={setFormData} />;
    // }
  };
  const submitStepForm = () => {
    if (page === FormTitles.length - 1) {
      if (editData) {
        const responce = clientEdit(formData);
        setLoading(true);
        responce.then(function (result) {
          setLoading(false);
          if (result.status === "Success") {
            navigate("/dashboard/client");
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
        const responce = clientAdd(formData);
        setLoading(true);
        responce.then(function (result) {
          setLoading(false);
          if (result.status === "Success") {
            navigate("/dashboard/client");
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
      {editData ? (
        <h2 className="component-title">Edit Client</h2>
      ) : (
        <h2 className="component-title">Add Client</h2>
      )}

      <div className="form-main-model">
        <ToastContainer />
        <div className="progressbar">
          <div
            style={{
              width:
                page === 0
                  ? "20%"
                  : page === 1
                  ? "40%"
                  : page === 2
                  ? "60%"
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
                  className={`'' ${page === 0 ? "prev" : "button-custom nex"}`}
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
                    formIsValid === 0 || loading ? "prev" : "button-custom nex"
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
    </div>
  );
}

export default Form;
