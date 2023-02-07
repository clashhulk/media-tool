import 'react-toastify/dist/ReactToastify.css';

import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addBriefData } from '../../adapter/BriefmsAdapter';

export default function Facebookform({
  setValue,
  formData,
  setFormData,
  action,
  month,
  year,
}) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data) => {
    if (id === "3") {
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
      console.log(data);
      setFormData({ ...data });
      setValue("2");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="datatable-container">
        {loading && (
          <div className="loading-overlay">
            <CircularProgress className="overlay-loader" />
          </div>
        )}
        <div className="formStyle">
          {/* Campaign Details */}
          <p className="formTitles">Campaign Details Facebook</p>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Business Name"
              variant="outlined"
              type="text"
              name="fbusiness_name"
              disabled={action === "view"}
              {...register("fbusiness_name", {
                required: {
                  value: true,
                  message: "Business name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors?.fbusiness_name ? true : false)}
              helperText={errors?.fbusiness_name?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Objective"
              variant="outlined"
              type="text"
              name="fobjective"
              disabled={action === "view"}
              {...register("fobjective", {
                required: {
                  value: true,
                  message: "Objective is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.fobjective)}
              helperText={errors.fobjective?.message}
            />
          </div>
          <div className="formItem">
            <label>start Date</label>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="date"
              name="fstart_date"
              placeholder="start Date"
              disabled={action === "view"}
              {...register("fstart_date", {
                required: "start Date is required!",
              })}
              error={Boolean(errors.fstart_date)}
              helperText={errors.fstart_date?.message}
            />
          </div>
          <div className="formItem">
            <label>End Date</label>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="date"
              name="fend_date"
              placeholder="End Date"
              disabled={action === "view"}
              {...register("fend_date", {
                required: "End Date is required!",
              })}
              error={Boolean(errors.fend_date)}
              helperText={errors.fend_date?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Target Market"
              variant="outlined"
              type="text"
              name="ftarget_markets"
              disabled={action === "view"}
              {...register("ftarget_markets", {
                required: {
                  value: true,
                  message: "Target Market is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.ftarget_markets)}
              helperText={errors.ftarget_markets?.message}
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
              name="fcustomer_type"
              disabled={action === "view"}
              {...register("fcustomer_type", {
                required: {
                  value: true,
                  message: "Customer Type is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.fcustomer_type)}
              helperText={errors.fcustomer_type?.message}
            />
          </div>
          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Keyword TG"
                variant="outlined"
                type="text"
                name="fkeywordtg"
                disabled={action === "view"}
                {...register("fkeywordtg", {
                  required: {
                    value: true,
                    message: "Keyword TG is required!",
                  },
                  pattern: {
                    value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                    message: "Please enter text character only",
                  },
                })}
                error={Boolean(errors.fkeywordtg)}
                helperText={errors.fkeywordtg?.message}
              />
            </div>
          )}
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="fdemogarphic_details_age">
                Demographic Details - Age
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("fdemogarphic_details_age")}
                labelId="fdemogarphic_details_age"
                id="fdemogarphic_details_age"
                name="fdemogarphic_details_age"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("fdemogarphic_details_age", {
                  required: "Please enter Demographic Details - Age",
                })}
                error={Boolean(errors.fdemogarphic_details_age)}
                helpertext={errors.fdemogarphic_details_age?.message}>
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
              <InputLabel id="fdemogarphic_gender">
                Demographic Gender
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("fdemogarphic_gender")}
                labelId="fdemogarphic_gender"
                id="fdemogarphic_gender"
                name="fdemogarphic_gender"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("fdemogarphic_gender", {
                  required: "Please Choose Your Gender",
                })}
                error={Boolean(errors.fdemogarphic_gender)}
                helpertext={errors.fdemogarphic_gender?.message}>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="fplacement">Placement</InputLabel>
              <Select
                multiple
                defaultValue={getValues("fplacement")}
                labelId="fplacement"
                id="fplacement"
                name="fplacement"
                label="Placement"
                disabled={action === "view"}
                {...register("fplacement", {
                  required: "Please select Placement",
                })}
                error={Boolean(errors.fplacement)}
                helpertext={errors.fplacement?.message}>
                <MenuItem value="facebook">facebook</MenuItem>
                <MenuItem value="instagram">instagram</MenuItem>
                <MenuItem value="adnetwork">adnetwork</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="fdetailed_training">
                Detailed Targeting
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("fdetailed_training")}
                labelId="fdetailed_training"
                id="fdetailed_training"
                name="fdetailed_training"
                label="Detailed Training"
                disabled={action === "view"}
                {...register("fdetailed_training", {
                  required: "Please select Detailed Training",
                })}
                error={Boolean(errors.fdetailed_training)}
                helpertext={errors.fdetailed_training?.message}>
                <MenuItem value="audience_detailed_expension">
                  Audience detailed expension
                </MenuItem>
                <MenuItem value="demographic">Demographic</MenuItem>
                <MenuItem value="interests">Interests</MenuItem>
                <MenuItem value="behaviors">Behaviors</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="flanguage">Language</InputLabel>
              <Select
                multiple
                defaultValue={getValues("flanguage")}
                labelId="flanguage"
                id="flanguage"
                name="flanguage"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("flanguage", {
                  required: "Select Your Language",
                })}
                error={Boolean(errors.flanguage)}
                helpertext={errors.flanguage?.message}>
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
              <InputLabel id="fdevice_targeting">Device targeting</InputLabel>
              <Select
                multiple
                defaultValue={getValues("fdevice_targeting")}
                labelId="fdevice_targeting"
                id="fdevice_targeting"
                name="fdevice_targeting"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("fdevice_targeting", {
                  required: "Select Your Device",
                })}
                error={Boolean(errors.fdevice_targeting)}
                helpertext={errors.fdevice_targeting?.message}>
                <MenuItem value={"Desktop"}>Desktop</MenuItem>
                <MenuItem value={"Mobile"}>Mobile</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Audience Size"
              variant="outlined"
              type="text"
              name="faudience_size"
              disabled={action === "view"}
              {...register("faudience_size", {
                required: {
                  value: true,
                  message: "Audience size is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.faudience_size)}
              helperText={errors.faudience_size?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Audience Name"
              variant="outlined"
              type="text"
              name="faudience_name"
              disabled={action === "view"}
              {...register("faudience_name", {
                required: {
                  value: true,
                  message: "Audience Name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.faudience_name)}
              helperText={errors.faudience_name?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Matched base"
              variant="outlined"
              type="text"
              name="fmatched_base"
              disabled={action === "view"}
              {...register("fmatched_base", {
                required: {
                  value: true,
                  message: "Matched base is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.fmatched_base)}
              helperText={errors.fmatched_base?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Exclusion Audience Name"
              variant="outlined"
              type="text"
              name="fexclusion_audience_name"
              disabled={action === "view"}
              {...register("fexclusion_audience_name", {
                required: {
                  value: true,
                  message: "Exclusion Audience Name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.fexclusion_audience_name)}
              helperText={errors.fexclusion_audience_name?.message}
            />
          </div>

          <p className="formTitles">Monthly Target Number</p>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Monthly Spend"
              variant="outlined"
              type="text"
              name="fmt_monthly_spend_number"
              disabled={action === "view"}
              {...register("fmt_monthly_spend_number", {
                required: {
                  value: true,
                  message: "Monthly Spend is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.fmt_monthly_spend_number)}
              helperText={errors.fmt_monthly_spend_number?.message}
            />
          </div>
          {(id === "3" ||
            id === "4" ||
            id === "5" ||
            id === "6" ||
            id === "7") && (
            <div className="formItem">
              <TextField
                fullWidth
                className="element"
                id="outlined-basic"
                label="Daily Spend"
                variant="outlined"
                type="text"
                name="fmt_daily_spend_number"
                disabled={action === "view"}
                {...register("fmt_daily_spend_number", {
                  required: {
                    value: true,
                    message: "Daily Spend is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_daily_spend_number)}
                helperText={errors.fmt_daily_spend_number?.message}
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
                name="fmt_cps"
                disabled={action === "view"}
                {...register("fmt_cps", {
                  required: {
                    value: true,
                    message: "CPS is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cps)}
                helperText={errors.fmt_cps?.message}
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
                name="fmt_appoitment_sale"
                disabled={action === "view"}
                {...register("fmt_appoitment_sale", {
                  required: {
                    value: true,
                    message: "Appointment/Sale is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_appoitment_sale)}
                helperText={errors.fmt_appoitment_sale?.message}
              />
            </div>
          )}
          {(id === "3" || id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Leads"
                variant="outlined"
                type="text"
                name="fmt_leads"
                disabled={action === "view"}
                {...register("fmt_leads", {
                  required: {
                    value: true,
                    message: "Leads is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_leads)}
                helperText={errors.fmt_leads?.message}
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
                name="fmt_cpl"
                disabled={action === "view"}
                {...register("fmt_cpl", {
                  required: {
                    value: true,
                    message: "CPL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cpl)}
                helperText={errors.fmt_cpl?.message}
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
                name="fmt_cpmcp"
                disabled={action === "view"}
                {...register("fmt_cpmcp", {
                  required: {
                    value: true,
                    message: "CPMCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cpmcp)}
                helperText={errors.fmt_cpmcp?.message}
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
                name="fmt_kyc"
                disabled={action === "view"}
                {...register("fmt_kyc", {
                  required: {
                    value: true,
                    message: "KYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_kyc)}
                helperText={errors.fmt_kyc?.message}
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
                name="fmt_cpkyc"
                disabled={action === "view"}
                {...register("fmt_cpkyc", {
                  required: {
                    value: true,
                    message: "CPKYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cpkyc)}
                helperText={errors.fmt_cpkyc?.message}
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
                name="fmt_card"
                disabled={action === "view"}
                {...register("fmt_card", {
                  required: {
                    value: true,
                    message: "CARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_card)}
                helperText={errors.fmt_card?.message}
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
                name="fmt_cpcard"
                disabled={action === "view"}
                {...register("fmt_cpcard", {
                  required: {
                    value: true,
                    message: "CPCARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cpcard)}
                helperText={errors.fmt_cpcard?.message}
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
                name="fmt_mcp"
                disabled={action === "view"}
                {...register("fmt_mcp", {
                  required: {
                    value: true,
                    message: "MCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_mcp)}
                helperText={errors.fmt_mcp?.message}
              />
            </div>
          )}

          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="COA"
                variant="outlined"
                type="text"
                name="fmt_coa"
                disabled={action === "view"}
                {...register("fmt_coa", {
                  required: {
                    value: true,
                    message: "COA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_coa)}
                helperText={errors.fmt_coa?.message}
              />
            </div>
          )}

          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Disbursal volume"
                variant="outlined"
                type="text"
                name="fmt_disbursal_volume"
                disabled={action === "view"}
                {...register("fmt_disbursal_volume", {
                  required: {
                    value: true,
                    message: "Disbursal volume is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_disbursal_volume)}
                helperText={errors.fmt_disbursal_volume?.message}
              />
            </div>
          )}

          {(id === "3" || id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPA"
                variant="outlined"
                type="text"
                name="fmt_cpa"
                disabled={action === "view"}
                {...register("fmt_cpa", {
                  required: {
                    value: true,
                    message: "CPA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cpa)}
                helperText={errors.fmt_cpa?.message}
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
                name="fmt_cibil"
                disabled={action === "view"}
                {...register("fmt_cibil", {
                  required: {
                    value: true,
                    message: "CIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cibil)}
                helperText={errors.fmt_cibil?.message}
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
                name="fmt_cpcibil"
                disabled={action === "view"}
                {...register("fmt_cpcibil", {
                  required: {
                    value: true,
                    message: "CPCIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cpcibil)}
                helperText={errors.fmt_cpcibil?.message}
              />
            </div>
          )}

          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Cutoff Metrics"
                variant="outlined"
                type="text"
                name="fmt_cutoff_metrics_number"
                disabled={action === "view"}
                {...register("fmt_cutoff_metrics_number", {
                  required: {
                    value: true,
                    message: "Cutoff Metrics is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cutoff_metrics_number)}
                helperText={errors.fmt_cutoff_metrics_number?.message}
              />
            </div>
          )}
          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Observation period"
                variant="outlined"
                type="text"
                name="fmt_observation_period_number"
                disabled={action === "view"}
                {...register("fmt_observation_period_number", {
                  required: {
                    value: true,
                    message: "Observation period is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_observation_period_number)}
                helperText={errors.fmt_observation_period_number?.message}
              />
            </div>
          )}
          {(id === "3" || id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Online Purchase"
                variant="outlined"
                type="text"
                name="flmp_onlinepurchase"
                disabled={action === "view"}
                {...register("fmt_onlinepurchase", {
                  required: {
                    value: true,
                    message: "Online Purchase is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_onlinepurchase)}
                helperText={errors.fmt_onlinepurchase?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPOP"
                variant="outlined"
                type="text"
                name="fmt_cpop"
                disabled={action === "view"}
                {...register("fmt_cpop", {
                  required: {
                    value: true,
                    message: "CPOP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.fmt_cpop)}
                helperText={errors.fmt_cpop?.message}
              />
            </div>
          )}
          {/* Last Month Performance */}
          <p className="formTitles">Last Month Performance</p>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Spend"
              variant="outlined"
              type="text"
              name="flmp_spend"
              disabled={action === "view"}
              {...register("flmp_spend", {
                required: {
                  value: true,
                  message: "Spend is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.flmp_spend)}
              helperText={errors.flmp_spend?.message}
            />
          </div>

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Leads"
                variant="outlined"
                type="text"
                name="flmp_leads"
                disabled={action === "view"}
                {...register("flmp_leads", {
                  required: {
                    value: true,
                    message: "Leads is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_leads)}
                helperText={errors.flmp_leads?.message}
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
                name="flmp_appoitment"
                disabled={action === "view"}
                {...register("flmp_appoitment_sale", {
                  required: {
                    value: true,
                    message: "Appointment/Sale is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_appoitment_sale)}
                helperText={errors.flmp_appoitment_sale?.message}
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
                name="flmp_mcp"
                disabled={action === "view"}
                {...register("flmp_mcp", {
                  required: {
                    value: true,
                    message: "MCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_mcp)}
                helperText={errors.flmp_mcp?.message}
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
                name="flmp_cpmcp"
                disabled={action === "view"}
                {...register("flmp_cpmcp", {
                  required: {
                    value: true,
                    message: "CPMCP is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_cpmcp)}
                helperText={errors.flmp_cpmcp?.message}
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
                name="flmp_cpa"
                disabled={action === "view"}
                {...register("flmp_cpa", {
                  required: {
                    value: true,
                    message: "CPA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_cpa)}
                helperText={errors.flmp_cpa?.message}
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
                name="flmp_kyc"
                disabled={action === "view"}
                {...register("flmp_kyc", {
                  required: {
                    value: true,
                    message: "KYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_kyc)}
                helperText={errors.flmp_kyc?.message}
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
                name="flmp_cpkyc"
                disabled={action === "view"}
                {...register("flmp_cpkyc", {
                  required: {
                    value: true,
                    message: "CPKYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_cpkyc)}
                helperText={errors.flmp_cpkyc?.message}
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
                name="flmp_card"
                disabled={action === "view"}
                {...register("flmp_card", {
                  required: {
                    value: true,
                    message: "CARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_card)}
                helperText={errors.flmp_card?.message}
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
                name="flmp_cpcard"
                disabled={action === "view"}
                {...register("flmp_cpcard", {
                  required: {
                    value: true,
                    message: "CPCARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_cpcard)}
                helperText={errors.flmp_cpcard?.message}
              />
            </div>
          )}

          {(id === "3" || id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Online Purchase"
                variant="outlined"
                type="text"
                name="flmp_onlinepurchase"
                disabled={action === "view"}
                {...register("flmp_onlinepurchase", {
                  required: {
                    value: true,
                    message: "Online Purchase is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_onlinepurchase)}
                helperText={errors.flmp_onlinepurchase?.message}
              />
            </div>
          )}

          {(id === "3" || id === "4" || id === "5" || id === "6") && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPL"
                variant="outlined"
                type="text"
                name="flmp_cpl"
                disabled={action === "view"}
                {...register("flmp_cpl", {
                  required: {
                    value: true,
                    message: "CPL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_cpl)}
                helperText={errors.flmp_cpl?.message}
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
                name="flmp_disbursal_volume"
                disabled={action === "view"}
                {...register("flmp_disbursal_volume", {
                  required: {
                    value: true,
                    message: "Disbursal volume is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_disbursal_volume)}
                helperText={errors.flmp_disbursal_volume?.message}
              />
            </div>
          )}

          {id === "6" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CIBIL"
                variant="outlined"
                type="text"
                name="flmp_cibil"
                disabled={action === "view"}
                {...register("flmp_cibil", {
                  required: {
                    value: true,
                    message: "CIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_cibil)}
                helperText={errors.flmp_cibil?.message}
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
                name="flmp_cpcibil"
                disabled={action === "view"}
                {...register("flmp_cpcibil", {
                  required: {
                    value: true,
                    message: "CPCIBIL is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_cpcibil)}
                helperText={errors.flmp_cpcibil?.message}
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
                name="flmp_coa"
                disabled={action === "view"}
                {...register("flmp_coa", {
                  required: {
                    value: true,
                    message: "COA is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.flmp_coa)}
                helperText={errors.flmp_coa?.message}
              />
            </div>
          )}

          {id !== "7" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Last month learning"
                variant="outlined"
                type="text"
                name="flast_month_learning"
                disabled={action === "view"}
                {...register("flast_month_learning", {
                  required: {
                    value: true,
                    message: "Creative Type is required!",
                  },
                })}
                error={Boolean(errors.flast_month_learning)}
                helperText={errors.flast_month_learning?.message}
              />
            </div>
          )}
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="existingchannel_facebook">
                Existing Channels
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("existingchannel_facebook")}
                labelId="existingchannel_facebook"
                id="existingchannel_facebook"
                name="existingchannel_facebook"
                label="Existing Channels"
                disabled={action === "view"}
                {...register("existingchannel_facebook", {
                  required: "Please select Existing Channels",
                })}
                error={Boolean(errors.existingchannel_facebook)}
                helpertext={errors.existingchannel_facebook?.message}>
                <MenuItem value={"Newsfeed"}>Newsfeed</MenuItem>
                <MenuItem value={"Catalog"}>Catalog</MenuItem>
                <MenuItem value={"Collection"}>Collection</MenuItem>
                <MenuItem value={"Remarketing"}>Remarketing</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="fcreative_type">Creative Type</InputLabel>
              <Select
                multiple
                defaultValue={getValues("fcreative_type")}
                labelId="fcreative_type"
                id="fcreative_type"
                name="fcreative_type"
                label="Existing Channels"
                disabled={action === "view"}
                {...register("fcreative_type", {
                  required: "Please select Existing Channels",
                })}
                error={Boolean(errors.fcreative_type)}
                helpertext={errors.fcreative_type?.message}>
                <MenuItem value={"Dynamic"}>Dynamic</MenuItem>
                <MenuItem value={"Carousel"}>Carousel</MenuItem>
                <MenuItem value={"Static"}>Static</MenuItem>
                <MenuItem value={"Video"}>Video</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Any Recomendation"
              variant="outlined"
              type="text"
              name="fany_recomendation"
              disabled={action === "view"}
              {...register("fany_recomendation", {
                required: {
                  value: true,
                  message: "Any Recomendation is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.fany_recomendation)}
              helperText={errors.fany_recomendation?.message}
            />
          </div>

          {action !== "view" && (
            <div className="formItem">
              <div className="custom-button-group">
                <Button
                  className={` nex`}
                  type="submit"
                  disabled={action === "view"}>
                  Prev
                </Button>
                <Button className={`button-custom prev`} type="submit">
                  {id === "3"
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
