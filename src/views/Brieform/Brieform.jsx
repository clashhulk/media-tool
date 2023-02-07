import '../../views/views.css';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Bingform from './Bingform';
import Facebookform from './Facebookform';
import Googleform from './Googleform';

function Brieform(props) {
  const location = useLocation();
  const action = location.state.action;
  console.log(location);
  const [formData, setFormData] = useState(location.state.data);
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="navView">
      <Button
        onClick={() => {
          navigate(-1);
        }}>
        <KeyboardBackspaceIcon />
      </Button>
      <ToastContainer />
      <p className="formName">
        Brief Name : {decodeURI(window.location.search.split("=")[1])}
      </p>
      <TabContext value={value}>
        <TabList
          onChange={handleTabs}
          aria-label="lab API tabs example"
          centered>
          <Tab label="Facebook" value="1" />
          {(id === "1" ||
            id === "2" ||
            id === "4" ||
            id === "5" ||
            id === "6" ||
            id === "7") && <Tab label="Google" value="2" />}
          {(id === "1" || id === "2" || id === "4") && (
            <Tab label="Bing" value="3" />
          )}
        </TabList>

        <TabPanel value="1">
          {/* <Facebookform nav={setValue} setFormData={setFormData} /> */}
          <Facebookform
            setValue={setValue}
            formData={formData}
            setFormData={setFormData}
            action={action}
            month={location.state.month}
            year={location.state.year}
          />
        </TabPanel>
        {(id === "1" ||
          id === "2" ||
          id === "4" ||
          id === "5" ||
          id === "6" ||
          id === "7") && (
          <TabPanel value="2">
            <Googleform
              setValue={setValue}
              formData={formData}
              setFormData={setFormData}
              action={action}
              month={location.state.month}
              year={location.state.year}
            />
          </TabPanel>
        )}

        {(id === "1" || id === "2" || id === "4") && (
          <TabPanel value="3">
            {/* <TabList onChange={handleTabs} aria-label="lab API tabs example">
              <Tab label="Bing" value="1" />
            </TabList> */}
            <Bingform
              setValue={setValue}
              formData={formData}
              setFormData={setFormData}
              action={action}
              month={location.state.month}
              year={location.state.year}
            />
          </TabPanel>
        )}
      </TabContext>
    </div>
  );
}

export default Brieform;
