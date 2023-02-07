import './profile.css';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { profileEdit } from '../../adapter/UserAdapter';

// const options = {
//   broadcaster: "pusher",
//   key: "7cf776e3d6c51dbbdffe",
//   cluster: "ap2",
//   forceTLS: "true",
//   //authEndpoint is your apiUrl + /broadcasting/auth
//   authEndpoint: "http://127.0.0.1:8000/api/notify",
//   // As I'm using JWT tokens, I need to manually set up the headers.
//   auth: {
//     headers: {
//       Authorization: `Bearer 1|B8jCUkoFwLl6QVtqIkfAMHepHn6JRNsK4oCca6ez`,
//       Accept: "application/json",
//     },
//   },
// };

// const echo = new Echo(options);
// echo.private(`App.User.2`).notification((data) => {
//   console.log(data);
// });
const Profile = () => {
  let user = JSON.parse(localStorage.getItem("userIn"));

  const [mode, setMode] = useState(false);
  user = user.user;
  const [formData, setFormData] = useState({
    phone: user.phone,
    address: user.address,
  });

  // useEffect(() => {
  const edit = () => {
    const responce = profileEdit(formData);
    // setLoading(true);
    responce.then(function (result) {
      // setLoading(false);
      if (result.status === "Success") {
        toast.success(result.message);
        setFormData({
          phone: result.data.phone,
          address: result.data.phone,
        });
        let temp = JSON.parse(localStorage.getItem("userIn"));
        temp.user.address = formData.address;
        temp.user.phone = formData.phone;
        localStorage.setItem("userIn", JSON.stringify(temp));
        // localStorage.setItem("userIn", JSON.stringify(data.data));
      } else {
        toast.error(
          JSON.stringify(result.message)
            .replace(/]|{|}/g, " ")
            .replace("[", " ")
        );
      }
    });
  };
  // }, [mode]);

  return (
    <>
      <div className="profile-container">
        <ToastContainer />
        <div className="profile">
          <div className="profile-head">
            <figure>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=100"
                alt=""
                height="100"
                width="100"
              />
            </figure>
            <h2>
              {user.firstname} {user.lastname}{" "}
            </h2>
          </div>
          <div className="infoItem">
            <p className="infoLable">Full name</p>
            <p className="infoContent">
              {user.firstname} {user.lastname}{" "}
            </p>
          </div>
          <div className="infoItem">
            <p className="infoLable">Email Id</p>
            <p className="infoContent">{user.email} </p>
          </div>
          <div className="infoItem">
            <p className="infoLable">User Type</p>
            <p className="infoContent">{user.user_type} </p>
          </div>
          <div className="infoItem">
            <p className="infoLable">User Role</p>
            <p className="infoContent">{user.roles[0].name} </p>
          </div>

          <div className="infoItem">
            <p className="infoLable">Phone</p>
            <p className="infoContent">
              <input
                className="profile-input"
                onChange={(event) => {
                  setMode(false);
                  setFormData({
                    ...formData,
                    phone: event.target.value,
                  });
                }}
                value={formData.phone}></input>
            </p>
          </div>
          <div className="infoItem">
            <p className="infoLable">Address</p>
            <p className="infoContent">
              <input
                className="profile-input"
                onChange={(event) => {
                  setMode(false);
                  setFormData({
                    ...formData,
                    address: event.target.value,
                  });
                }}
                value={formData.address}></input>{" "}
            </p>
          </div>
          {/* <div className="infoItem">
              <p className="infoLable">User ID</p>
              <p className="infoContent">{user.id} </p>
            </div>
            <div className="infoItem">
              <p className="infoLable">Parent User ID</p>
              <p className="infoContent">{user.parent_id} </p>
            </div> */}
          {/* <div className="infoItem">
              <p className="infoLable">User Type</p>
              <p className="infoContent">{user.user_type} </p>
            </div>
            <div className="infoItem">
              <p className="infoLable">Last Updated at</p>
              <p className="infoContent">{user.updated_at} </p>
            </div>
            <div className="infoItem">
              <p className="infoLable">Created at</p>
              <p className="infoContent">{user.created_at} </p>
            </div> */}
          <Button
            disabled={mode}
            className={true ? "prev" : "button-custom"}
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => {
              edit();
              setMode(true);
            }}>
            Update
          </Button>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
    </>
  );
};

export default Profile;
