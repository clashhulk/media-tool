import 'react-toastify/dist/ReactToastify.css';

import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addBriefData } from '../../adapter/BriefmsAdapter';

export default function Bimngform({
  setValue,
  formData,
  setFormData,
  action,
  month,
  year,
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  let navigate = useNavigate();
  const onSubmit = (data) => {
    setFormData({ ...data });
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
        toast.success(result.message);
        navigate("/dashboard/briefsummary");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form id="bingForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Campaign Details */}
      <div className="datatable-container">
        {loading && (
          <div className="loading-overlay">
            <CircularProgress className="overlay-loader" />
          </div>
        )}
        <div className="formStyle">
          <p className="formTitles">Campaign Details Bing</p>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Business Name"
              variant="outlined"
              type="text"
              name="bbusiness_name"
              disabled={action === "view"}
              {...register("bbusiness_name", {
                required: {
                  value: true,
                  message: "Business name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bbusiness_name)}
              helperText={errors.bbusiness_name?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Objective"
              variant="outlined"
              type="text"
              name="bobjective"
              disabled={action === "view"}
              {...register("bobjective", {
                required: {
                  value: true,
                  message: "Objective is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bobjective)}
              helperText={errors.bobjective?.message}
            />
          </div>
          <div className="formItem">
            <label>start Date</label>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="date"
              name="bstart_date"
              placeholder="start Date"
              disabled={action === "view"}
              {...register("bstart_date", {
                required: "start Date is required!",
              })}
              error={Boolean(errors.bstart_date)}
              helperText={errors.bstart_date?.message}
            />
          </div>
          <div className="formItem">
            <label>End Date</label>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="date"
              name="bend_date"
              placeholder="End Date"
              disabled={action === "view"}
              {...register("bend_date", {
                required: "End Date is required!",
              })}
              error={Boolean(errors.bend_date)}
              helperText={errors.bend_date?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Target Market"
              variant="outlined"
              type="text"
              name="btarget_markets"
              disabled={action === "view"}
              {...register("btarget_markets", {
                required: {
                  value: true,
                  message: "Target Market is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.btarget_markets)}
              helperText={errors.btarget_markets?.message}
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
              name="bcustomer_type"
              disabled={action === "view"}
              {...register("bcustomer_type", {
                required: {
                  value: true,
                  message: "Customer Type is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bcustomer_type)}
              helperText={errors.bcustomer_type?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Keyword TG"
              variant="outlined"
              type="text"
              name="bkeywordtg"
              disabled={action === "view"}
              {...register("bkeywordtg", {
                required: {
                  value: true,
                  message: "Keyword TG is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bkeywordtg)}
              helperText={errors.bkeywordtg?.message}
            />
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="inMarket">Inmarket</InputLabel>
              <Select
                defaultValue={getValues("binmarket")}
                labelId="binmarket"
                id="binmarket"
                name="binmarket"
                label="In Market"
                disabled={action === "view"}
                {...register("binmarket", {
                  required: "Please select Market",
                })}
                error={Boolean(errors.binmarket)}
                helpertext={errors.binmarket?.message}>
                <MenuItem value="inMarket">inMarket</MenuItem>
                <MenuItem value="apptargeting">App Targeting</MenuItem>
                <MenuItem value="url">URL</MenuItem>
                <MenuItem value="place">Place</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="bdemogarphic_details_age">
                Demographic Details - Age
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("bdemogarphic_details_age")}
                labelId="bdemogarphic_details_age"
                id="bdemogarphic_details_age"
                name="bdemogarphic_details_age"
                label="Demographic Details - Age"
                disabled={action === "view"}
                {...register("bdemogarphic_details_age", {
                  required: "Please enter Demographic Details - Age",
                })}
                error={Boolean(errors.bdemogarphic_details_age)}
                helpertext={errors.bdemogarphic_details_age?.message}>
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
              <InputLabel id="bdemogarphic_gender">
                Demographic Gender
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("bdemogarphic_gender")}
                labelId="bdemogarphic_gender"
                id="bdemogarphic_gender"
                name="bdemogarphic_gender"
                label="Demographic gender"
                disabled={action === "view"}
                {...register("bdemogarphic_gender", {
                  required: "Please Choose Your Gender",
                })}
                error={Boolean(errors.bdemogarphic_gender)}
                helpertext={errors.bdemogarphic_gender?.message}>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="bhousehold_income">Household Income</InputLabel>
              <Select
                defaultValue={getValues("bhousehold_income")}
                labelId="bhousehold_income"
                id="bhousehold_income"
                name="bhousehold_income"
                label="Household income"
                disabled={action === "view"}
                {...register("bhousehold_income", {
                  required: "Household income",
                })}
                error={Boolean(errors.bhousehold_income)}
                helpertext={errors.bhousehold_income?.message}>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"11- 0"}>11-20</MenuItem>
                <MenuItem value={"20-30"}>20-30</MenuItem>
                <MenuItem value={"30-40"}>30-40</MenuItem>
                <MenuItem value={"40-50"}>40-50</MenuItem>
                <MenuItem value={"50"}>50</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="bplacement">Placement</InputLabel>
              <Select
                multiple
                defaultValue={getValues("bplacement")}
                labelId="bplacement"
                id="bplacement"
                name="bplacement"
                label="Placement"
                disabled={action === "view"}
                {...register("bplacement", {
                  required: "Please select Placement",
                })}
                error={Boolean(errors.bplacement)}
                helpertext={errors.bplacement?.message}>
                <MenuItem value="facebook">facebook</MenuItem>
                <MenuItem value="instagram">instagram</MenuItem>
                <MenuItem value="adnetwork">adnetwork</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="bdetailed_training">
                Detailed Targeting
              </InputLabel>
              <Select
                multiple
                defaultValue={getValues("bdetailed_training")}
                labelId="bdetailed_training"
                id="bdetailed_training"
                name="bdetailed_training"
                label="Detailed Training"
                disabled={action === "view"}
                {...register("bdetailed_training", {
                  required: "Please select Detailed Training",
                })}
                error={Boolean(errors.bdetailed_training)}
                helpertext={errors.bdetailed_training?.message}>
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
              <InputLabel id="blanguage">Language</InputLabel>
              <Select
                multiple
                defaultValue={getValues("blanguage")}
                labelId="blanguage"
                id="blanguage"
                name="blanguage"
                label="Language"
                disabled={action === "view"}
                {...register("blanguage", {
                  required: "Select Your Language",
                })}
                error={Boolean(errors.blanguage)}
                helpertext={errors.blanguage?.message}>
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
            <TextField
              fullWidth
              id="outlined-basic"
              label="Audience Size and Name"
              variant="outlined"
              type="text"
              name="baudience_size"
              disabled={action === "view"}
              {...register("baudience_size", {
                required: {
                  value: true,
                  message: "Audience size is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.baudience_size)}
              helperText={errors.baudience_size?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Audience Name"
              variant="outlined"
              type="text"
              name="baudience_name"
              disabled={action === "view"}
              {...register("baudience_name", {
                required: {
                  value: true,
                  message: "Audience Name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.baudience_name)}
              helperText={errors.baudience_name?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Matched base"
              variant="outlined"
              type="text"
              name="bmatched_base"
              disabled={action === "view"}
              {...register("bmatched_base", {
                required: {
                  value: true,
                  message: "Matched base is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bmatched_base)}
              helperText={errors.bmatched_base?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Exclusion Audience Name"
              variant="outlined"
              type="text"
              name="bexclusion_audience_name"
              disabled={action === "view"}
              {...register("bexclusion_audience_name", {
                required: {
                  value: true,
                  message: "Exclusion Audience Name is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bexclusion_audience_name)}
              helperText={errors.bexclusion_audience_name?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Device targeting"
              variant="outlined"
              type="text"
              name="bdevice_targeting"
              disabled={action === "view"}
              {...register("bdevice_targeting", {
                required: {
                  value: true,
                  message: "Device targeting is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bdevice_targeting)}
              helperText={errors.bdevice_targeting?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Monthly Spend"
              variant="outlined"
              type="text"
              name="bmt_monthly_spend_number"
              disabled={action === "view"}
              {...register("bmt_monthly_spend_number", {
                required: {
                  value: true,
                  message: "Monthly Spend is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.bmt_monthly_spend_number)}
              helperText={errors.bmt_monthly_spend_number?.message}
            />
          </div>

          {/* Last Month Performance */}
          <p className="formTitles">Last Month Performance</p>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Spend"
              variant="outlined"
              type="text"
              name="blmp_spend"
              disabled={action === "view"}
              {...register("blmp_spend", {
                required: {
                  value: true,
                  message: "Spend is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_spend)}
              helperText={errors.blmp_spend?.message}
            />
          </div>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Leads"
              variant="outlined"
              type="text"
              name="blmp_leads"
              disabled={action === "view"}
              {...register("blmp_leads", {
                required: {
                  value: true,
                  message: "Leads is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_leads)}
              helperText={errors.blmp_leads?.message}
            />
          </div>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="MCP"
              variant="outlined"
              type="text"
              name="blmp_mcp"
              disabled={action === "view"}
              {...register("blmp_mcp", {
                required: {
                  value: true,
                  message: "MCP is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_mcp)}
              helperText={errors.blmp_mcp?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Observation period"
              variant="outlined"
              type="text"
              name="blmp_observation_period_number"
              disabled={action === "view"}
              {...register("blmp_observation_period_number", {
                required: {
                  value: true,
                  message: "Observation period is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_observation_period_number)}
              helperText={errors.blmp_observation_period_number?.message}
            />
          </div>
          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Cutoff Metrics"
              variant="outlined"
              type="text"
              name="blmp_cutoff_metrics_number"
              disabled={action === "view"}
              {...register("blmp_cutoff_metrics_number", {
                required: {
                  value: true,
                  message: "Cutoff Metrics is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_cutoff_metrics_number)}
              helperText={errors.blmp_cutoff_metrics_number?.message}
            />
          </div>
          {id === "4" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="KYC"
                variant="outlined"
                type="text"
                name="blmp_kyc"
                disabled={action === "view"}
                {...register("blmp_kyc", {
                  required: {
                    value: true,
                    message: "KYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.blmp_kyc)}
                helperText={errors.blmp_kyc?.message}
              />
            </div>
          )}
          {id === "4" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPKYC"
                variant="outlined"
                type="text"
                name="blmp_cpkyc"
                disabled={action === "view"}
                {...register("blmp_cpkyc", {
                  required: {
                    value: true,
                    message: "CPKYC is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.blmp_cpkyc)}
                helperText={errors.blmp_cpkyc?.message}
              />
            </div>
          )}

          {id === "4" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CARD"
                variant="outlined"
                type="text"
                name="blmp_card"
                disabled={action === "view"}
                {...register("blmp_card", {
                  required: {
                    value: true,
                    message: "CARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.blmp_card)}
                helperText={errors.blmp_card?.message}
              />
            </div>
          )}

          {id === "4" && (
            <div className="formItem">
              <TextField
                fullWidth
                id="outlined-basic"
                label="CPCARD"
                variant="outlined"
                type="text"
                name="blmp_cpcard"
                disabled={action === "view"}
                {...register("blmp_cpcard", {
                  required: {
                    value: true,
                    message: "CPCARD is required!",
                  },
                  pattern: {
                    value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "Please enter numbers only",
                  },
                })}
                error={Boolean(errors.blmp_cpcard)}
                helperText={errors.blmp_cpcard?.message}
              />
            </div>
          )}

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Disbursal volume"
              variant="outlined"
              type="text"
              name="blmp_disbursal_volume"
              disabled={action === "view"}
              {...register("blmp_disbursal_volume", {
                required: {
                  value: true,
                  message: "Disbursal volume is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_disbursal_volume)}
              helperText={errors.blmp_disbursal_volume?.message}
            />
          </div>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="CIBIL"
              variant="outlined"
              type="text"
              name="blmp_cibil"
              disabled={action === "view"}
              {...register("blmp_cibil", {
                required: {
                  value: true,
                  message: "CIBIL is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_cibil)}
              helperText={errors.blmp_cibil?.message}
            />
          </div>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="CPCIBIL"
              variant="outlined"
              type="text"
              name="blmp_cpcibil"
              disabled={action === "view"}
              {...register("blmp_cpcibil", {
                required: {
                  value: true,
                  message: "CPCIBIL is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_cpcibil)}
              helperText={errors.blmp_cpcibil?.message}
            />
          </div>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="COA"
              variant="outlined"
              type="text"
              name="blmp_coa"
              disabled={action === "view"}
              {...register("blmp_coa", {
                required: {
                  value: true,
                  message: "COA is required!",
                },
                pattern: {
                  value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  message: "Please enter numbers only",
                },
              })}
              error={Boolean(errors.blmp_coa)}
              helperText={errors.blmp_coa?.message}
            />
          </div>

          {/* Creative Type */}
          <p className="formTitles">Creative Type</p>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Creative Type"
              variant="outlined"
              type="text"
              name="bcreative_type"
              disabled={action === "view"}
              {...register("bcreative_type", {
                required: {
                  value: true,
                  message: "Creative Type is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bcreative_type)}
              helperText={errors.bcreative_type?.message}
            />
          </div>

          <div className="formItem">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Any Recomendation"
              variant="outlined"
              type="text"
              name="bany_recomendation"
              disabled={action === "view"}
              {...register("bany_recomendation", {
                required: {
                  value: true,
                  message: "Any Recomendation is required!",
                },
                pattern: {
                  value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                  message: "Please enter text character only",
                },
              })}
              error={Boolean(errors.bany_recomendation)}
              helperText={errors.bany_recomendation?.message}
            />
          </div>

          {action !== "view" && (
            <div className="formItem">
              <div className="custom-button-group">
                <Button
                  className="button-custom prev"
                  onClick={() => {
                    setValue("2");
                  }}>
                  Prev
                </Button>
                <Button className="button-custom prev" type="submit">
                  {action === "edit" ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
