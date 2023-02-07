import 'chart.js/auto';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { briefNumbers } from '../../adapter/BriefmsAdapter';

function PiChart() {
  const [data, setData] = React.useState({
    labels: ["Approved briefs", "Pending brief", "Paused brief"],
    datasets: [
      {
        label: "Attendance for Week 1",
        data: [1, 24, 25],

        // borderColor: "rgb(255 162 184)",
        backgroundColor: [
          "rgb(16 230 14 / 82%)",
          "rgb(228 209 19 / 77%)",
          "rgb(255 136 136 / 77%)",
        ],
        pointBackgroundColor: "rgba(255,206,86,0.2)",
      },
    ],
  });
  useEffect(() => {
    const response = briefNumbers();
    response.then(function (result) {
      if (result.status === "Success") {
        setData({
          labels: ["Approved briefs", "Pending brief", "Paused brief"],
          datasets: [
            {
              label: "Attendance for Week 1",
              data: [
                result.data.plan_approved,
                result.data.pending_brief,
                result.data.campaign_paused,
              ],
              // borderColor: "rgb(255 162 184)",
              backgroundColor: [
                "rgb(16 230 14 / 82%)",
                "rgb(228 209 19 / 77%)",
                "rgb(255 136 136 / 77%)",
              ],
              pointBackgroundColor: "rgba(255,206,86,0.2)",
            },
          ],
        });
      } else {
        console.warn("failed to load client list");
      }
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Briefs Status",
      },
    },
  };

  return (
    <div className="doughnut-container">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default PiChart;
