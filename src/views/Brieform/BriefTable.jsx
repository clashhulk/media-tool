import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import createCache from "@emotion/cache";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

function BriefTable() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const columns = [
    { name: "Brief No", options: { filterOptions: { fullWidth: true } } },
    "Client Name",
    "Brief Name",
    "Duration",
    "PO Approval",
    "Report",
    "Brief Status"
  ];

  const options = {
    search: searchBtn,
    selectableRows: false,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    }
  };

  const data = [
    ["ESP12311-22/1000", "Gabby George", "Business Analyst",  "05-2022 - 09-2023", <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />],
    ["ESP12342-23/1111",
      "Aiden Lloyd",
      "Tony's Burger Palace",
      "05-2022 - 09-2023", <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon />
    ],
    ["ESP12334","Jaden Collins", "Attorney",  "2022-05 - 2023-04", <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon /> ],
    ["ESP12443","Franky Rees", "Business Analyst",  "2022-05 - 2023-04", <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />],
    ["ESP15523","Aaren Rose", null,  "2022-05 - 2023-04", <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />],
    ["ESP12663","Johnny Jones", "Business Analyst",  "2022-05 - 2023-04", <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />],
    ["ESP12377","Jimmy Johns", "Business Analyst",  "2022-05 - 2023-04", <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon />],
    ["ESP12388","Jack Jackson", "Business Analyst",  "05-2022 - 09-2023", <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon />],
    ["ESP12399","Joe Jones", "Computer Programmer", "Tom Clancy's",  <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon />],
    ["ESP12310","Jacky Jackson", "Business Consultant",  "2022-05 - 2023-04", <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon />],
    ["ESP12312","Jo Jo", "Software Developer",  <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon />],
    ["ESP12312","Donna Marie", "Business Manager",  "05-2022 - 09-2023", <CheckCircleOutlineIcon />, <CloudUploadIcon />, <CheckCircleOutlineIcon />]
  ];

  return (
         
        <MUIDataTable
          title={"Brief Management"}
          data={data}
          columns={columns}
          options={options}
        />
  );
}

export default BriefTable;