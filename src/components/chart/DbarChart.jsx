import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { monthWiseBriefNumbers } from '../../adapter/BriefmsAdapter';

// let months = [
//   { id: 1, month: "January" },
//   { id: 2, month: "February" },
//   { id: 3, month: "March" },
//   { id: 4, month: "April" },
//   { id: 5, month: "May" },
//   { id: 6, month: "June" },
//   { id: 7, month: "July" },
//   { id: 8, month: "August" },
//   { id: 9, month: "September" },
//   { id: 10, month: "October" },
//   { id: 11, month: "November" },
//   { id: 12, month: "December" },
// ];
// const d = new Date();
// let obj = months[d.getMonth() - 1];

const DbarChart = () => {
  const [data, setData] = React.useState({
    labels: [
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total brief",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },

      {
        label: "Approved briefs",
        backgroundColor: "#00ff002e",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "#00ff00",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });
  useEffect(() => {
    const response = monthWiseBriefNumbers();
    response.then(function (result) {
      if (result.status === "Success") {
        setData({
          labels: result.data.month,
          datasets: [
            {
              label: "Total brief",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              //stack: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: result.data.total_brief,
            },

            {
              label: "Approved briefs",
              backgroundColor: "#00ff002e",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              //stack: 1,
              hoverBackgroundColor: "#00ff00",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: result.data.approved_brief,
            },
          ],
        });
      } else {
        console.warn("failed to load Chart data");
      }
    });
  }, []);

  const options = {
    type: "bar",
    data: data,
    // options: {
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //     },
    //   },
    // },
  };

  return (
    <div className="dubleBarChrat-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DbarChart;
