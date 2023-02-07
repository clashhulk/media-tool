import React from "react";
import TextField from "@mui/material/TextField";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const SixthStep = ({ formData, setFormData }) => {

    return (
      <div className="other-info-container">  
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Contact Person Details(CEO)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="stepForm">
              <div className="formItem">
                <TextField type="text"
                  placeholder="CEO Name..." label="CEO Name" variant="outlined" required value={formData.ceoName}
                  onChange={(event) =>
                    setFormData({ ...formData, ceoName: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="CEO Designation..." label="CEO Designation" variant="outlined" required value={formData.ceoDesignation}
                  onChange={(event) =>
                    setFormData({ ...formData, ceoDesignation: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="email"
                  placeholder="CEO Email Id..." label="CEO Email Id" variant="outlined" required value={formData.ceoEmail}
                  onChange={(event) =>
                    setFormData({ ...formData, ceoEmail: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="CEO Mobile No..." label="CEO Mobile No" variant="outlined" required value={formData.ceoMobile}
                  onChange={(event) =>
                    setFormData({ ...formData, ceoMobile: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="CEO Landline No..." label="CEO Landline No" variant="outlined" required value={formData.ceoLandline}
                  onChange={(event) =>
                    setFormData({ ...formData, ceoLandline: event.target.value })
                  } />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
  
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Contact Person Details (Day To Day Operations)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="stepForm">
              <div className="formItem">
                <TextField type="text"
                  placeholder="dtd Name..." label="dtd Name" variant="outlined" required value={formData.dtdName}
                  onChange={(event) =>
                    setFormData({ ...formData, dtdName: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="dtd Designation..." label="dtd Designation" variant="outlined" required value={formData.dtdDesignation}
                  onChange={(event) =>
                    setFormData({ ...formData, dtdDesignation: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="email"
                  placeholder="dtd Email Id..." label="dtd Email Id" variant="outlined" required value={formData.dtdEmail}
                  onChange={(event) =>
                    setFormData({ ...formData, dtdEmail: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="dtd Mobile No..." label="dtd Mobile No" variant="outlined" required value={formData.dtdMobile}
                  onChange={(event) =>
                    setFormData({ ...formData, dtdMobile: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="dtd Landline No..." label="dtd Landline No" variant="outlined" required value={formData.dtdLandline}
                  onChange={(event) =>
                    setFormData({ ...formData, dtdLandline: event.target.value })
                  } />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
  
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Contact Person Details (Head of Marketing)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="stepForm">
              <div className="formItem">
                <TextField type="text"
                  placeholder="HOM Name..." label="HOM Name" variant="outlined" required value={formData.homName}
                  onChange={(event) =>
                    setFormData({ ...formData, homName: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="HOM Designation..." label="HOM Designation" variant="outlined" required value={formData.homDesignation}
                  onChange={(event) =>
                    setFormData({ ...formData, homDesignation: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="email"
                  placeholder="HOM Email Id..." label="HOM Email Id" variant="outlined" required value={formData.homEmail}
                  onChange={(event) =>
                    setFormData({ ...formData, homEmail: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="HOM Mobile No..." label="HOM Mobile No" variant="outlined" required value={formData.homMobile}
                  onChange={(event) =>
                    setFormData({ ...formData, homMobile: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="HOM Landline No..." label="HOM Landline No" variant="outlined" required value={formData.homLandline}
                  onChange={(event) =>
                    setFormData({ ...formData, homLandline: event.target.value })
                  } />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
  
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Contact Person Details (Finance) </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="stepForm">
              <div className="formItem">
                <TextField type="number"
                  placeholder="Contact Person Name Finance..." label="Contact Person Name Finance" variant="outlined"
                   required value={formData.financeName}
                  onChange={(event) =>
                    setFormData({ ...formData, financeName: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="Designation..." label="Designation" variant="outlined" required value={formData.financeDesignation}
                  onChange={(event) =>
                    setFormData({ ...formData, financeDesignation: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="email"
                  placeholder="Email Id..." label="Email Id" variant="outlined" required value={formData.financeEmail}
                  onChange={(event) =>
                    setFormData({ ...formData, financeEmail: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="Mobile No..." label="Mobile No" variant="outlined" required value={formData.financeMobile}
                  onChange={(event) =>
                    setFormData({ ...formData, financeMobile: event.target.value })
                  } />
              </div>
              <div className="formItem">
                <TextField type="text"
                  placeholder="Landline No..." label="Landline No" variant="outlined" required value={formData.financeLandline}
                  onChange={(event) =>
                    setFormData({ ...formData, financeLandline: event.target.value })
                  } />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
  
      </div>
    );
  }
  
  export default SixthStep