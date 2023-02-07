import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import PublishIcon from '@material-ui/icons/Publish';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
function FifthStep({ formData, setFormData }) {
  return (
    <div className="personal-info-container">

      <div className="stepForm">
        <div className="formItem">
          <input
            type="file"
            style={{ display: 'none' }}
            id="contractFile"
            onChange={(e)=> setFormData({ ...formData, contractFile: e.target.files[0]})}
          />
          <label className='upload-file-lable' htmlFor="contractFile">
            Upload Contract File
            <Button
              startIcon={<PublishIcon />}
              variant="contained"
              color="primary" component="span">
              Upload
            </Button>
          </label>
        </div>
        </div>
        <div className="stepForm">
        <div className="formItem">
          <TextField type="date" variant="outlined"
            min="2014-01-01"
            required value={formData.contractStartDate}
            onChange={(event) =>
              setFormData({ ...formData, contractStartDate: event.target.value })
            } /></div>
        <div className="formItem">
          <TextField type="date" variant="outlined"
            min="2014-01-01"
            required value={formData.contractEndDate}
            onChange={(event) =>
              setFormData({ ...formData, contractEndDate: event.target.value })
            } />
        </div>
      </div>
    </div>
  );
}

export default FifthStep;