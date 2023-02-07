import 'react-toastify/dist/ReactToastify.css';

import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import UploadIcon from '@mui/icons-material/Upload';
import { Button, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { briefMsDelete, briefSummaryList, getMediaPlan, mediaPlanUpload } from '../../adapter/BriefmsAdapter.jsx';
import { clientList } from '../../adapter/ClientAdapter';
import BurgerMenu from '../../components/menu/BurgerMenu.jsx';
import allowedRoll from '../../functions/allowedRoll';
import toBriefCrud from '../../functions/toBriefCrud';
import { baseUrl } from '../../variables/Variables';

let months = [
  { id: 1, month: "January" },
  { id: 2, month: "February" },
  { id: 3, month: "March" },
  { id: 4, month: "April" },
  { id: 5, month: "May" },
  { id: 6, month: "June" },
  { id: 7, month: "July" },
  { id: 8, month: "August" },
  { id: 9, month: "September" },
  { id: 10, month: "October" },
  { id: 11, month: "November" },
  { id: 12, month: "December" },
];
let years = [
  "All",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
];
const d = new Date();
let obj = d.getDate() < 20 ? months[d.getMonth()] : months[d.getMonth() + 1];

const BriefSummary = () => {
  let Suser = JSON.parse(localStorage.getItem("userIn"));
  const [loading, setLoading] = useState({ table: true, action: true });
  const [data, setData] = useState([]);
  const [clients, setClients] = useState([]);
  const [filterData, setFilterData] = useState(
    Suser.client.length > 0
      ? { clientId: Suser.client[0].id, month: obj.id, year: d.getFullYear() }
      : { clientId: "", month: obj.id, year: d.getFullYear() }
  );
  var navigate = useNavigate();
  useEffect(() => {
    /*
    user roll (client media,tech team) then call briefbelongstouser API    
    
    user roll (admin,supper admin ,client admin) then call briefbelongstoclient API    
 */
    const info = briefSummaryList(filterData);
    setLoading({ table: true });
    info.then(function (result) {
      setLoading({ table: false });
      if (result.status === "Success") {
        setData(result.data);
      } else {
        toast.error(result.message);
      }
    });
    if (allowedRoll(1, 2) !== true) {
      const response1 = clientList();
      response1.then(function (result) {
        if (result.status === "Success") {
          setClients(result.data.clients);
        } else {
          console.warn("failed to load client list");
        }
      });
    }
  }, [filterData]);
  const updateData = () => {
    const info = briefSummaryList(filterData);
    setLoading({ table: true });
    info.then(function (result) {
      setLoading({ table: false });
      if (result.status === "Success") {
        setData(result.data);
      } else {
        toast.error(result.message);
      }
    });
    if (allowedRoll(1, 2) !== true) {
      const response1 = clientList();
      response1.then(function (result) {
        if (result.status === "Success") {
          setClients(result.data.clients);
        } else {
          console.warn("failed to load client list");
        }
      });
    }
  };
  const uploadMediaPlan = (client_id, brief_id, file, month, year) => {
    const info = mediaPlanUpload(client_id, brief_id, file, month, year);
    setLoading({ action: true });
    info.then(function (result) {
      setLoading({ action: false });
      if (result.status === "Success") {
        // setData(result.data);
        toast.success(result.message);
        updateData();
      } else {
        toast.error(result.message);
      }
    });
  };
  const handleDelete = (id) => {
    const dinfo = briefMsDelete(id);
    dinfo.then(function (result) {
      if (result.status === "Success") {
        toast.success(result.data.name + " " + result.message);
        setData(data.filter((item) => item.id !== id));
      } else {
        toast.error(result.message);
      }
    });
  };

  const columns = [
    // { name: "client_id", label: "ID", width: 100 },
    {
      name: "id",
      label: "id",
      width: 200,
      options: {
        filter: true,
        customBodyRender: (value: any, meta: MUIDataTableMeta) => {
          return meta.rowIndex + 1;
        },
      },
    },
    {
      name: "company_name",
      label: "Company name",
      width: 200,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "brief_name",
      label: "Brief name",
      width: 200,
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div
              onClick={async () => {
                setLoading({ action: true });
                const responce = toBriefCrud(
                  "view",
                  data[tableMeta.rowIndex].client_id,
                  data[tableMeta.rowIndex].brief_id,
                  data[tableMeta.rowIndex].month,
                  data[tableMeta.rowIndex].year
                );
                responce.then(function (result) {
                  setLoading({ action: false });

                  navigate(
                    "/dashboard/Brieform/" +
                      data[tableMeta.rowIndex].brief_id +
                      +"?form=" +
                      value,
                    {
                      state: result,
                    }
                  );
                });
              }}>
              {value.toLowerCase()}
            </div>
          );
        },
      },
    },
    // {
    //   name: "brief_id",
    //   label: "Brief View",
    //   align: "center",
    //   options: {
    //     filter: true,
    //     align: "center",
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <div className="">
    //           {data[tableMeta.rowIndex].final_status !== "pending" ? (
    //             <Button
    //               onClick={async () => {
    //                 setLoading({ action: true });
    //                 const responce = toBriefCrud(
    //                   "view",
    //                   data[tableMeta.rowIndex].client_id,
    //                   value,
    //                   filterData.month,
    //                   filterData.year
    //                 );
    //                 responce.then(function (result) {
    //                   setLoading({ action: false });
    //                   navigate(
    //                     "/dashboard/Brieform/" +
    //                       value +
    //                       "?form=" +
    //                       data[tableMeta.rowIndex].brief_name,
    //                     {
    //                       state: result,
    //                     }
    //                   );
    //                 });
    //               }}>
    //               <VisibilityIcon style={{ color: "#f30061" }} />
    //             </Button>
    //           ) : (
    //             <Button disabled>
    //               <VisibilityIcon />
    //             </Button>
    //           )}
    //         </div>
    //       );
    //     },
    //   },
    // },

    {
      name: "final_status",
      label: "Status",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value.replaceAll("_", " ")}</div>;
        },
      },
    },
    allowedRoll(2, 1, 4) !== true
      ? {
          name: "brief_id",
          label: "Media Plan",
          options: {
            filter: true,
            align: "center",
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div className="">
                  {data[tableMeta.rowIndex].final_status === "spoc_mediaplan" ||
                  data[tableMeta.rowIndex].final_status ===
                    "media_plan_not_shared" ||
                  data[tableMeta.rowIndex].final_status ===
                    "revised_plan_required" ? (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#e5e5e5e3", color: "#333" }}
                      component="label">
                      Upload File
                      <UploadIcon />
                      <input
                        type="file"
                        onChange={(e) => {
                          uploadMediaPlan(
                            data[tableMeta.rowIndex].client_id,
                            value,
                            e.target.files[0],
                            data[tableMeta.rowIndex].month,
                            data[tableMeta.rowIndex].year
                          );
                        }}
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        hidden
                      />
                    </Button>
                  ) : data[tableMeta.rowIndex].final_status ===
                      "media_plan_shared" ||
                    data[tableMeta.rowIndex].final_status ===
                      "plan_approved" ? (
                    <Button
                      onClick={() => {
                        const info = getMediaPlan(
                          value,
                          data[tableMeta.rowIndex].client_id,
                          data[tableMeta.rowIndex].month,
                          data[tableMeta.rowIndex].year
                        );
                        setLoading({ table: true });
                        info.then(function (result) {
                          setLoading({ table: false });
                          if (result.status === "Success") {
                            window.location.href =
                              baseUrl + "storage/mediaplan/" + result.data;
                          } else {
                            toast.error(result.message);
                          }
                        });
                      }}>
                      <SimCardDownloadIcon style={{ color: "#f30061" }} />
                    </Button>
                  ) : (
                    "NA"
                  )}
                </div>
              );
            },
          },
        }
      : {
          name: "brief_id",
          label: "Media Plan",
          options: {
            filter: true,
            align: "center",
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  {data[tableMeta.rowIndex].final_status ===
                    "media_plan_shared" ||
                  data[tableMeta.rowIndex].final_status === "plan_approved" ? (
                    <Button
                      onClick={() => {
                        const info = getMediaPlan(
                          value,
                          data[tableMeta.rowIndex].client_id,
                          data[tableMeta.rowIndex].month,
                          data[tableMeta.rowIndex].year
                        );
                        setLoading({ table: true });
                        info.then(function (result) {
                          setLoading({ table: false });
                          if (result.status === "Success") {
                            window.location.href =
                              baseUrl + "storage/mediaplan/" + result.data;
                          } else {
                            toast.error(result.message);
                          }
                        });
                      }}>
                      <SimCardDownloadIcon style={{ color: "#f30061" }} />
                    </Button>
                  ) : (
                    "NA"
                  )}
                </div>
              );
            },
          },
        },
    {
      name: "brief_id",
      label: "Action",
      options: {
        filter: true,
        align: "center",
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <BurgerMenu
                client_id={data[tableMeta.rowIndex].client_id}
                brief_id={value}
                name={data[tableMeta.rowIndex].brief_name}
                status={data[tableMeta.rowIndex].final_status}
                setLoading={setLoading}
                updateData={updateData}
                month={filterData.month}
                year={filterData.year}
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    serverSide: true,
    onTableChange: (action, tableState) => {
      this.xhrRequest("my.api.com/tableData", (result) => {
        this.setState({ data: result });
      });
    },
  };

  return (
    <>
      <div className="navView" style={{ overflow: "visible" }}>
        <ToastContainer />
        <div className="component-titleContainer">
          {allowedRoll(1, 2) !== true ? (
            <div className="formItem">
              <FormControl fullWidth>
                <InputLabel id="clients">Select Client</InputLabel>
                <Select
                  labelId="clients"
                  value={filterData.clientId}
                  defaultValue=""
                  label="Select clients"
                  onChange={(event) => {
                    setFilterData({
                      ...filterData,
                      clientId: event.target.value,
                    });
                  }}
                  fullWidth
                  required>
                  <MenuItem key="" value=" ">
                    All Clients
                  </MenuItem>
                  {clients.map((client) => {
                    return (
                      <MenuItem key={client.id} value={client.id}>
                        {client.company_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          ) : (
            <div className="formItem"></div>
          )}

          <div className="byType">
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select
                value={filterData.month}
                label="Month"
                onChange={(event) => {
                  setFilterData({
                    ...filterData,
                    month: event.target.value,
                  });
                }}>
                {months.map((month) => {
                  return (
                    <MenuItem key={month.id} value={month.id}>
                      {month.month}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="byType">
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={filterData.year}
                label="year"
                onChange={(event) => {
                  setFilterData({
                    ...filterData,
                    year: event.target.value,
                  });
                }}>
                {years.map((year) => {
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          {/* <h2 className="component-title">Brief Summary</h2> */}
          {/* <Link style={{ textDecoration: 'none' }} to="/dashboard/briefmaster/add">
						<Button
							startIcon={<PersonAdd />}
							color="secondary"
							fullWidth
							style={{
								backgroundColor: 'rgb(153 120 240)'
							}}
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Create
						</Button>
					</Link> */}
        </div>

        <div className="datatable-container">
          {loading.action && (
            <div className="loading-overlay">
              <CircularProgress className="overlay-loader" />
            </div>
          )}
          {loading.table ? (
            <LinearProgress />
          ) : (
            <MUIDataTable
              data={data}
              columns={columns}
              options={{
                rowsPerPage: 10,
                rowsPerPageOptions: [10, 20, 50],
                jumpToPage: true,
                options,
                search: true,
                selectableRows: "none",
                selectableRowsOnClick: false,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BriefSummary;
