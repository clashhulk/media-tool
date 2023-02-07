import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addBriefData } from '../../adapter/BriefmsAdapter';

export default function Googleform({
  setValue,
  formData,
  setFormData,
  action,
  month,
  year,
}) {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: formData });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const onSubmit = (data) => {
    if (id === "5" || id === "6" || id === "7") {
      const responce = addBriefData(
        { ...formData, ...data },
        decodeURI(window.location.search.split("=")[1]),
        id,
        month,
        year,
        action
      );
      setLoading(true);
      responce.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          navigate("/dashboard/briefsummary");
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    } else {
      setFormData({ ...data });
      setValue("3");
    }
  };

  return (
    <form id="googleForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Campaign Details */}
      <div className="datatable-container">
        {loading && (
          <div className="loading-overlay">
            <CircularProgress className="overlay-loader" />
          </div>
        )}
        <div className="formStyle">
          <p className="formTitles">Campaign Details Google</p>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Business Name"
              variant="outlined"
              type="text"
              name="gbusiness_name"
              disabled={action === "view"}
              {...register("gbusiness_name", {
                required: {
                  value: true,
                  message: "Business name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gbusiness_name)}
              helperText={errors.gbusiness_name?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Objective"
              variant="outlined"
              type="text"
              name="gobjective"
              disabled={action === "view"}
              {...register("gobjective", {
                required: {
                  value: true,
                  message: "Objective is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gobjective)}
              helperText={errors.gobjective?.message}
            />
          </div>
          <div className="formItem">
            <label>start Date</label>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="date"
              name="gstart_date"
              placeholder="start Date"
              disabled={action === "view"}
              {...register("gstart_date", {
                required: "start Date is required!",
              })}
              error={Boolean(errors.gstart_date)}
              helperText={errors.gstart_date?.message}
            />
          </div>
          <div className="formItem">
            <label>End Date</label>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="date"
              name="gend_date"
              placeholder="End Date"
              disabled={action === "view"}
              {...register("gend_date", {
                required: "End Date is required!",
              })}
              error={Boolean(errors.gend_date)}
              helperText={errors.gend_date?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Target Market"
              variant="outlined"
              type="text"
              name="gtarget_markets"
              disabled={action === "view"}
              {...register("gtarget_markets", {
                required: {
                  value: true,
                  message: "Target Market is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gtarget_markets)}
              helperText={errors.gtarget_markets?.message}
            />
          </div>
          {/* Targeting Number */}
          <p className="formTitles">Targeting Number</p>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Customer Type"
              variant="outlined"
              type="text"
              name="gcustomer_type"
              disabled={action === "view"}
              {...register("gcustomer_type", {
                required: {
                  value: true,
                  message: "Customer Type is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gcustomer_type)}
              helperText={errors.gcustomer_type?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Keyword TG"
              variant="outlined"
              type="text"
              name="gkeywordtg"
              disabled={action === "view"}
              {...register("gkeywordtg", {
                required: {
                  value: true,
                  message: "Keyword TG is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gkeywordtg)}
              helperText={errors.gkeywordtg?.message}
            />
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="inMarket">Inmarket</InputLabel>
              <Select
                multiple
                defaultValue={getValues("ginmarket")}
                labelId="ginmarket"
                id="ginmarket"
                name="ginmarket"
                label="In Market"
                disabled={action === "view"}
                {...register("ginmarket", {
                  required: "Please enter Demographic Details - Age",
                })}
                error={Boolean(errors.ginmarket)}
                helpertext={errors.ginmarket?.message}>
                <MenuItem value="inMarket">inMarket</MenuItem>
                <MenuItem value="apptargeting">App Targeting</MenuItem>
                <MenuItem value="url">URL</MenuItem>
                <MenuItem value="place">Place</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="gdemogarphic_details_age">
                Demographic Details - Age
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("gdemogarphic_details_age")}
                labelId="gdemogarphic_details_age"
                id="gdemogarphic_details_age"
                name="gdemogarphic_details_age"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("gdemogarphic_details_age", {
                  required: "Please enter Demographic Details - Age",
                })}
                error={Boolean(errors.gdemogarphic_details_age)}
                helpertext={errors.gdemogarphic_details_age?.message}>
                <MenuItem value={"18-24"}>18-24</MenuItem>
                <MenuItem value={"25-34"}>25-34</MenuItem>
                <MenuItem value={"35-44"}>35-44</MenuItem>
                <MenuItem value={"45-54"}>45-54</MenuItem>
                <MenuItem value={"55-64"}>55-64</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="gdemogarphic_gender">
                Demographic Gender
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("gdemogarphic_gender")}
                labelId="gdemogarphic_gender"
                id="gdemogarphic_gender"
                name="gdemogarphic_gender"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("gdemogarphic_gender", {
                  required: "Please Choose Your Gender",
                })}
                error={Boolean(errors.gdemogarphic_gender)}
                helpertext={errors.gdemogarphic_gender?.message}>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="ghousehold_income">Household Income</InputLabel>
              <Select
                multiple
                defaultValue={getValues("ghousehold_income")}
                labelId="ghousehold_income"
                id="ghousehold_income"
                name="ghousehold_income"
                label="Household income"
                disabled={action === "view"}
                {...register("ghousehold_income", {
                  required: "Household income",
                })}
                error={Boolean(errors.ghousehold_income)}
                helpertext={errors.ghousehold_income?.message}>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"11- 0"}>11-20</MenuItem>
                <MenuItem value={"20-30"}>20-30</MenuItem>
                <MenuItem value={"30-40"}>30-40</MenuItem>
                <MenuItem value={"40-50"}>40-50</MenuItem>
                <MenuItem value={"50"}>50</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="gplacement">Placement</InputLabel>
              <Select
                multiple
                defaultValue={getValues("gplacement")}
                labelId="gplacement"
                id="gplacement"
                name="gplacement"
                label="Placement"
                disabled={action === "view"}
                {...register("gplacement", {
                  required: "Please select Placement",
                })}
                error={Boolean(errors.gplacement)}
                helpertext={errors.gplacement?.message}>
                <MenuItem value="facebook">facebook</MenuItem>
                <MenuItem value="instagram">instagram</MenuItem>
                <MenuItem value="adnetwork">adnetwork</MenuItem>
              </Select>
            </FormControl>
          </div> */}

          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="glanguage">Language</InputLabel>
              <Select
                multiple
                defaultValue={getValues("glanguage")}
                labelId="glanguage"
                id="glanguage"
                name="glanguage"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("glanguage", {
                  required: "Select Your Language",
                })}
                error={Boolean(errors.glanguage)}
                helpertext={errors.glanguage?.message}>
                <MenuItem value={"english"}>English</MenuItem>
                <MenuItem value={"hindi"}>Hindi</MenuItem>
                <MenuItem value={"tamil"}>Tamil</MenuItem>
                <MenuItem value={"marathi"}>Marathi</MenuItem>
                <MenuItem value={"gujrati"}>Gujrati</MenuItem>
                <MenuItem value={"telugu"}>Telugu</MenuItem>
                <MenuItem value={"bengali"}>Bengali</MenuItem>
                <MenuItem value={"malyalam"}>Malyalam</MenuItem>
                <MenuItem value={"punjabi"}>Punjabi</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="gdevice_targeting">Device targeting</InputLabel>
              <Select
                multiple
                defaultValue={getValues("gdevice_targeting")}
                labelId="gdevice_targeting"
                id="gdevice_targeting"
                name="gdevice_targeting"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("gdevice_targeting", {
                  required: "Select Your device",
                })}
                error={Boolean(errors.gdevice_targeting)}
                helpertext={errors.gdevice_targeting?.message}>
                <MenuItem value={"Desktop"}>Desktop</MenuItem>
                <MenuItem value={"Mobile"}>Mobile</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Audience Size and Name"
              variant="outlined"
              type="text"
              name="gaudience_size"
              disabled={action === "view"}
              {...register("gaudience_size", {
                required: {
                  value: true,
                  message: "Audience size is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.gaudience_size)}
              helperText={errors.gaudience_size?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Audience Name"
              variant="outlined"
              type="text"
              name="gaudience_name"
              disabled={action === "view"}
              {...register("gaudience_name", {
                required: {
                  value: true,
                  message: "Audience Name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gaudience_name)}
              helperText={errors.gaudience_name?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Matched base"
              variant="outlined"
              type="text"
              name="gmatched_base"
              disabled={action === "view"}
              {...register("gmatched_base", {
                required: {
                  value: true,
                  message: "Matched base is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gmatched_base)}
              helperText={errors.gmatched_base?.message}
            />
          </div>
          {/* <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Exclusion Audience Name"
              variant="outlined"
              type="text"
              name="gexclusion_audience_name"
              disabled={action === "view"}
              {...register("gexclusion_audience_name", {
                required: {
                  value: true,
                  message: "Exclusion Audience Name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gexclusion_audience_name)}
              helperText={errors.gexclusion_audience_name?.message}
            />
          </div> */}

          <p className="formTitles">Monthly Target Number</p>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Monthly Spend"
              variant="outlined"
              type="text"
              name="gmt_monthly_spend_number"
              disabled={action === "view"}
              {...register("gmt_monthly_spend_number", {
                required: {
                  value: true,
                  message: "Monthly Spend is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.gmt_monthly_spend_number)}
              helperText={errors.gmt_monthly_spend_number?.message}
            />
          </div>
          {id === "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Daily Spend"
                variant="outlined"
                type="text"
                name="gmt_daily_spend_number"
                disabled={action === "view"}
                {...register("gmt_daily_spend_number", {
                  required: {
                    value: true,
                    message: "Daily Spend is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gmt_daily_spend_number)}
                helperText={errors.gmt_daily_spend_number?.message}
              />
            </div>
          )}
          {id === "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="KYC"
                variant="outlined"
                type="text"
                name="gmt_kyc"
                disabled={action === "view"}
                {...register("gmt_kyc", {
                  required: {
                    value: true,
                    message: "KYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gmt_kyc)}
                helperText={errors.gmt_kyc?.message}
              />
            </div>
          )}

          {id === "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPKYC"
                variant="outlined"
                type="text"
                name="gmt_cpkyc"
                disabled={action === "view"}
                {...register("gmt_cpkyc", {
                  required: {
                    value: true,
                    message: "CPKYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gmt_cpkyc)}
                helperText={errors.gmt_cpkyc?.message}
              />
            </div>
          )}
          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPCIBIL"
                variant="outlined"
                type="text"
                name="gmt_cpcibil"
                disabled={action === "view"}
                {...register("gmt_cpcibil", {
                  required: {
                    value: true,
                    message: "CPCIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gmt_cpcibil)}
                helperText={errors.gmt_cpcibil?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="COA"
                variant="outlined"
                type="text"
                name="gmt_coa"
                disabled={action === "view"}
                {...register("gmt_coa", {
                  required: {
                    value: true,
                    message: "COA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gmt_coa)}
                helperText={errors.gmt_coa?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Disbursal volume"
                variant="outlined"
                type="text"
                name="gmt_disbursal_volume"
                disabled={action === "view"}
                {...register("gmt_disbursal_volume", {
                  required: {
                    value: true,
                    message: "Disbursal volume is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gmt_disbursal_volume)}
                helperText={errors.gmt_disbursal_volume?.message}
              />
            </div>
          )}

          {/* Last Month Performance */}
          <p className="formTitles">Last Month Performance</p>

          {(id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Daily Spend"
                variant="outlined"
                type="text"
                name="glmp_daily_spend"
                disabled={action === "view"}
                {...register("glmp_daily_spend", {
                  required: {
                    value: true,
                    message: "Daily Spend is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_daily_spend)}
                helperText={errors.glmp_daily_spend?.message}
              />
            </div>
          )}
          {(id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPS"
                variant="outlined"
                type="text"
                name="glmp_cps"
                disabled={action === "view"}
                {...register("glmp_cps", {
                  required: {
                    value: true,
                    message: "CPS is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cps)}
                helperText={errors.glmp_cps?.message}
              />
            </div>
          )}
          {(id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Appointment/Sale"
                variant="outlined"
                type="text"
                name="glmp_appoitment_sale"
                disabled={action === "view"}
                {...register("glmp_appoitment_sale", {
                  required: {
                    value: true,
                    message: "Appointment/Sale is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_appoitment_sale)}
                helperText={errors.glmp_appoitment_sale?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Leads"
                variant="outlined"
                type="text"
                name="glmp_leads"
                disabled={action === "view"}
                {...register("glmp_leads", {
                  required: {
                    value: true,
                    message: "Leads is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_leads)}
                helperText={errors.glmp_leads?.message}
              />
            </div>
          )}
          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPL"
                variant="outlined"
                type="text"
                name="glmp_cpl"
                disabled={action === "view"}
                {...register("glmp_cpl", {
                  required: {
                    value: true,
                    message: "CPL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cpl)}
                helperText={errors.glmp_cpl?.message}
              />
            </div>
          )}
          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="MCP"
                variant="outlined"
                type="text"
                name="glmp_mcp"
                disabled={action === "view"}
                {...register("glmp_mcp", {
                  required: {
                    value: true,
                    message: "MCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_mcp)}
                helperText={errors.glmp_mcp?.message}
              />
            </div>
          )}
          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPMCP"
                variant="outlined"
                type="text"
                name="glmp_cpmcp"
                disabled={action === "view"}
                {...register("glmp_cpmcp", {
                  required: {
                    value: true,
                    message: "CPMCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cpmcp)}
                helperText={errors.glmp_cpmcp?.message}
              />
            </div>
          )}
          {(id === "4" || id === "5" || id === "6" || id === "7") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="KYC"
                variant="outlined"
                type="text"
                name="glmp_kyc"
                disabled={action === "view"}
                {...register("glmp_kyc", {
                  required: {
                    value: true,
                    message: "KYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_kyc)}
                helperText={errors.glmp_kyc?.message}
              />
            </div>
          )}
          {(id === "4" || id === "5" || id === "6" || id === "7") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPKYC"
                variant="outlined"
                type="text"
                name="glmp_cpkyc"
                disabled={action === "view"}
                {...register("glmp_cpkyc", {
                  required: {
                    value: true,
                    message: "CPKYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cpkyc)}
                helperText={errors.glmp_cpkyc?.message}
              />
            </div>
          )}
          {(id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CARD"
                variant="outlined"
                type="text"
                name="glmp_card"
                disabled={action === "view"}
                {...register("glmp_card", {
                  required: {
                    value: true,
                    message: "CARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_card)}
                helperText={errors.glmp_card?.message}
              />
            </div>
          )}
          {(id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPCARD"
                variant="outlined"
                type="text"
                name="glmp_cpcard"
                disabled={action === "view"}
                {...register("glmp_cpcard", {
                  required: {
                    value: true,
                    message: "CPCARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cpcard)}
                helperText={errors.glmp_cpcard?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="COA"
                variant="outlined"
                type="text"
                name="glmp_coa"
                disabled={action === "view"}
                {...register("glmp_coa", {
                  required: {
                    value: true,
                    message: "COA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_coa)}
                helperText={errors.glmp_coa?.message}
              />
            </div>
          )}
          <div className="formItem">
            <TextField
              fullWidth
              label="Spend"
              variant="outlined"
              type="text"
              name="glmp_spend"
              disabled={action === "view"}
              {...register("glmp_spend", {
                required: {
                  value: true,
                  message: "Spend is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.glmp_spend)}
              helperText={errors.glmp_spend?.message}
            />
          </div>

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CIBIL"
                variant="outlined"
                type="text"
                name="glmp_cibil"
                disabled={action === "view"}
                {...register("glmp_cibil", {
                  required: {
                    value: true,
                    message: "CIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cibil)}
                helperText={errors.glmp_cibil?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPCIBIL"
                variant="outlined"
                type="text"
                name="glmp_cpcibil"
                disabled={action === "view"}
                {...register("glmp_cpcibil", {
                  required: {
                    value: true,
                    message: "CPCIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cpcibil)}
                helperText={errors.glmp_cpcibil?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Disbursal volume"
                variant="outlined"
                type="text"
                name="glmp_disbursal_volume"
                disabled={action === "view"}
                {...register("glmp_disbursal_volume", {
                  required: {
                    value: true,
                    message: "Disbursal volume is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_disbursal_volume)}
                helperText={errors.glmp_disbursal_volume?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Observation period"
                variant="outlined"
                type="text"
                name="glmp_observation_period_number"
                disabled={action === "view"}
                {...register("glmp_observation_period_number", {
                  required: {
                    value: true,
                    message: "Observation period is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_observation_period_number)}
                helperText={errors.glmp_observation_period_number?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Cutoff Metrics"
                variant="outlined"
                type="text"
                name="glmp_cutoff_metrics_number"
                disabled={action === "view"}
                {...register("glmp_cutoff_metrics_number", {
                  required: {
                    value: true,
                    message: "Cutoff Metrics is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.glmp_cutoff_metrics_number)}
                helperText={errors.glmp_cutoff_metrics_number?.message}
              />
            </div>
          )}
          {/* <div className="formItem">
          <TextField
            fullWidth
            id="outlined-basic"
            label="CPA"
            variant="outlined"
            type="text"
            name="gcpa_mt_number"
            disabled={action === "view"}{...register("gcpa_mt_number", {
              required: {
                value: true,
                message: "CPA is required!",
              },
              pattern: {
                value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                message: "Please enter numbers only",
              },
            })}
            error={Boolean(errors.gcpa_mt_number)}
            helperText={errors.gcpa_mt_number?.message}
          />
        </div>

        <div className="formItem">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Online Purchase"
            variant="outlined"
            type="text"
            name="gonline_purchase_mt_number"
            disabled={action === "view"}{...register("gonline_purchase_mt_number", {
              required: {
                value: true,
                message: "Online Purchase is required!",
              },
              pattern: {
                value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                message: "Please enter numbers only",
              },
            })}
            error={Boolean(errors.gonline_purchase_mt_number)}
            helperText={errors.gonline_purchase_mt_number?.message}
          />
        </div>

        <div className="formItem">
          <TextField
            fullWidth
            id="outlined-basic"
            label="CPOP"
            variant="outlined"
            type="text"
            name="gcpop_mt_number"
            disabled={action === "view"}{...register("gcpop_mt_number", {
              required: {
                value: true,
                message: "CPOP is required!",
              },
              pattern: {
                value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                message: "Please enter numbers only",
              },
            })}
            error={Boolean(errors.gcpop_mt_number)}
            helperText={errors.gcpop_mt_number?.message}
          />
        </div> */}
          {/* Monthly Target Number

        */}
          <p className="formTitles">New Initiatives Number</p>
          {(id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="MCP"
                variant="outlined"
                type="text"
                name="gni_mcp"
                disabled={action === "view"}
                {...register("gni_mcp", {
                  required: {
                    value: true,
                    message: "MCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_mcp)}
                helperText={errors.gni_mcp?.message}
              />
            </div>
          )}
          {(id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPMCP"
                variant="outlined"
                type="text"
                name="gni_cpmcp"
                disabled={action === "view"}
                {...register("gni_cpmcp", {
                  required: {
                    value: true,
                    message: "Monthly target CPMCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_cpmcp)}
                helperText={errors.gni_cpmcp?.message}
              />
            </div>
          )}
          {(id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPL"
                variant="outlined"
                type="text"
                name="gni_cpl"
                disabled={action === "view"}
                {...register("gni_cpl", {
                  required: {
                    value: true,
                    message: "CPL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_cpl)}
                helperText={errors.gni_cpl?.message}
              />
            </div>
          )}
          {(id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPA"
                variant="outlined"
                type="text"
                name="gni_cpa"
                disabled={action === "view"}
                {...register("gni_cpa", {
                  required: {
                    value: true,
                    message: "CPA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_cpa)}
                helperText={errors.gni_cpa?.message}
              />
            </div>
          )}

          {(id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="KYC"
                variant="outlined"
                type="text"
                name="gni_kyc"
                disabled={action === "view"}
                {...register("gni_kyc", {
                  required: {
                    value: true,
                    message: "KYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_kyc)}
                helperText={errors.gni_kyc?.message}
              />
            </div>
          )}

          {(id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPKYC"
                variant="outlined"
                type="text"
                name="gni_cpkyc"
                disabled={action === "view"}
                {...register("gni_cpkyc", {
                  required: {
                    value: true,
                    message: "CPKYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_cpkyc)}
                helperText={errors.gni_cpkyc?.message}
              />
            </div>
          )}
          {(id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CARD"
                variant="outlined"
                type="text"
                name="gni_card"
                disabled={action === "view"}
                {...register("gni_card", {
                  required: {
                    value: true,
                    message: "CARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_card)}
                helperText={errors.gni_card?.message}
              />
            </div>
          )}
          {(id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPCARD"
                variant="outlined"
                type="text"
                name="gni_cpcard"
                disabled={action === "view"}
                {...register("gni_cpcard", {
                  required: {
                    value: true,
                    message: "CPCARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_cpcard)}
                helperText={errors.gni_cpcard?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Disbursal volume"
                variant="outlined"
                type="text"
                name="gni_disbursal_volume"
                disabled={action === "view"}
                {...register("gni_disbursal_volume", {
                  required: {
                    value: true,
                    message: "Disbursal volume is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_disbursal_volume)}
                helperText={errors.gni_disbursal_volume?.message}
              />
            </div>
          )}
          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CIBIL"
                variant="outlined"
                type="text"
                name="gni_cibil"
                disabled={action === "view"}
                {...register("gni_cibil", {
                  required: {
                    value: true,
                    message: "CIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_cibil)}
                helperText={errors.gni_cibil?.message}
              />
            </div>
          )}
          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPCIBIL"
                variant="outlined"
                type="text"
                name="gni_cpcibil"
                disabled={action === "view"}
                {...register("gni_cpcibil", {
                  required: {
                    value: true,
                    message: "CPCIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_cpcibil)}
                helperText={errors.gni_cpcibil?.message}
              />
            </div>
          )}
          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="COA"
                variant="outlined"
                type="text"
                name="gni_coa"
                disabled={action === "view"}
                {...register("gni_coa", {
                  required: {
                    value: true,
                    message: "COA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.gni_coa)}
                helperText={errors.gni_coa?.message}
              />
            </div>
          )}

          {id === "7" && (
            <div className="formItem">
              <FormControl fullWidth>
                <InputLabel id="existingchannel_google">
                  Existing Channels
                </InputLabel>
                <Select
                  multiple
                  defaultValue={getValues("existingchannel_google")}
                  labelId="existingchannel_google"
                  id="existingchannel_google"
                  name="existingchannel_google"
                  label="Existing Channels"
                  disabled={action === "view"}
                  {...register("existingchannel_google", {
                    required: "Please select Existing Channels",
                  })}
                  error={Boolean(errors.existingchannel_google)}
                  helpertext={errors.existingchannel_google?.message}>
                  <MenuItem value={"Display"}>Display</MenuItem>
                  <MenuItem value={"Youtube"}>Youtube</MenuItem>
                  <MenuItem value={"Remarketing"}>Remarketing</MenuItem>
                  <MenuItem value={"ProMax"}>ProMax</MenuItem>
                  <MenuItem value={"Discovery"}>Discovery</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Any Recomendation"
              variant="outlined"
              type="text"
              name="gni_any_recomendation"
              disabled={action === "view"}
              {...register("gni_any_recomendation", {
                required: {
                  value: true,
                  message: "Any Recomendation is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.gni_any_recomendation)}
              helperText={errors.gni_any_recomendation?.message}
            />
          </div>
          {action !== "view" && (
            <div className="formItem">
              <div className="custom-button-group">
                <Button
                  className="button-custom prev"
                  type="submit"
                  onClick={() => {
                    setValue("1");
                  }}>
                  Prev
                </Button>
                <Button className="button-custom prev" type="submit">
                  {id === "5" || id === "6" || id === "7"
                    ? action === "edit"
                      ? "Update"
                      : "Submit"
                    : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
