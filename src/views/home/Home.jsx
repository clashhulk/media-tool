import './home.css';

import LinkIcon from '@mui/icons-material/Link';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import DbarChart from '../../components/chart/DbarChart';
import FeaturedInfo from '../../components/chart/FeaturedInfo';
import PiChart from '../../components/chart/PiChart';
import allowedRoll from './../../functions/allowedRoll';

export default function Home() {
  let navigate = useNavigate();
  return (
    <>
      <div className="navView">
        {/* <Topbar /> */}
        <FeaturedInfo />

        <div className="widgets-row">
          <PiChart />
          <DbarChart />
        </div>

        <div className="widgets-blocks">
          <div className="widgets-block">
            <div className="widgets-block-title">QUICK LINK </div>
            <div className="widgets-block-items">
              {allowedRoll(1, 2) !== true && (
                <div className="widgets-block-item">
                  <LinkIcon style={{ margin: "0 5px" }} />
                  <span
                    onClick={() => {
                      navigate("briefmaster");
                    }}
                    className="widgets-block-item-text">
                    Briefmaster List
                  </span>
                </div>
              )}
              {allowedRoll(1, 2) !== true && (
                <div className="widgets-block-item">
                  <LinkIcon style={{ margin: "0 5px" }} />
                  <span
                    onClick={() => {
                      navigate("assign_briefs");
                    }}
                    className="widgets-block-item-text">
                    Assign Briefs to specific client. 
                  </span>
                </div>
              )}
              {allowedRoll(1, 2, 19) !== true && (
                <div className="widgets-block-item">
                  <LinkIcon style={{ margin: "0 5px" }} />
                  <span
                    onClick={() => {
                      navigate("user");
                    }}
                    className="widgets-block-item-text">
                    All users
                  </span>
                </div>
              )}
              {allowedRoll(1, 2, 19) !== true && (
                <div className="widgets-block-item">
                  <LinkIcon style={{ margin: "0 5px" }} />
                  <span
                    onClick={() => {
                      navigate("assign-clients");
                    }}
                    className="widgets-block-item-text">
                    Assign users to specific briefs. 
                  </span>
                </div>
              )}
              <div className="widgets-block-item">
                <LinkIcon style={{ margin: "0 5px" }} />{" "}
                <span
                  onClick={() => {
                    navigate("briefsummary");
                  }}
                  className="widgets-block-item-text">
                  Obtain the assigned brief summary 
                </span>
              </div>
            </div>
          </div>
          {/* <div className="widgets-block">
              <div
                className="widgets-block-title"
                style={{ color: "#3333337d" }}>
                WELCOME TO THE FRESHLY DESIGNED BRIMAS
              </div>
              <div className="widgets-block-items">
                <div className="widgets-block-item">
                  <span
                    style={{ color: "#3333337d" }}
                    // onClick={() => {
                    //   navigate("feedback");
                    // }}
                    className="widgets-block-item-text">
                    Any Feedback?
                  </span>

                  <QuizIcon style={{ margin: "0 5px" }} />
                </div>
                <div className="widgets-block-item">
                  <span
                    style={{ color: "#3333337d" }}
                    // onClick={() => {
                    //   navigate("profile");
                    // }}
                    className="widgets-block-item-text">
                    Don't know your Role In BRIMAS?
                  </span>
                  <QuizIcon style={{ margin: "0 5px" }} />
                </div>
                <div className="widgets-block-item">
                  <span
                    style={{ color: "#3333337d" }}
                    // onClick={() => {
                    //   navigate("about");
                    // }}
                    className="widgets-block-item-text">
                    Want to know more about BRIMAS?
                  </span>
                  <QuizIcon style={{ margin: "0 5px" }} />
                </div>
              </div>
            </div> */}
        </div>
      </div>
      <Outlet />
    </>
  );
}
