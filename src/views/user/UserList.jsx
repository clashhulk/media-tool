import 'react-toastify/dist/ReactToastify.css';

import { DeleteOutline, Edit, PersonAdd } from '@material-ui/icons';
import { Button, FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { clientList } from '../../adapter/ClientAdapter';
import { userDelete, usersList } from '../../adapter/UserAdapter';
import allowedRoll from '../../functions/allowedRoll';

export default function UserList() {
  let Suser = JSON.parse(localStorage.getItem("userIn"));

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [filterData, setFilterData] = useState(
    Suser.client.length > 0
      ? { clientId: Suser.client[0].id, userType: `External` }
      : { clientId: "All", userType: `All` }
  );
  const [data, setData] = useState([]);
  var navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const response = usersList(filterData);
    response.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        setData(result.data);
      } else {
        toast.error(result.message);
      }
    });
    const response1 = clientList();
    response1.then(function (result) {
      if (result.status === "Success") {
        setClients(result.data.clients);
      } else {
        console.warn("failed to load client list");
      }
    });
  }, [filterData]);
  const handleEdit = (user) => {
    navigate("/dashboard/user/crud/", { state: user });
  };
  const handleDelete = (id) => {
    const dinfo = userDelete(id);
    dinfo.then(function (result) {
      if (result.status === "Success") {
        toast.success(result.data.name + " " + result.message);
        setData(data.filter((item) => item.id !== id));
      } else {
        toast.error(result.message);
      }
    });
  };

  // Columns Data

  const columns = [
    { name: "id", label: "ID", width: 100 },
    {
      name: "firstname",
      label: "Full name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {value} {tableMeta.rowData[2]}
            </div>
          );
        },
      },
      width: 250,
    },
    {
      name: "lastname",
      options: {
        display: false,
      },
    },

    { name: "email", label: "Email", width: 250 },

    {
      name: "phone",
      label: "Phone no",
      width: 200,
    },
    {
      name: "address",
      label: "Address",
      width: 250,
    },
    {
      name: "user_type",
      label: "type",
      width: 250,
    },

    {
      name: "id",
      label: "Action",
      width: 250,
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Edit
                className="ListEdit"
                onClick={() => handleEdit(data[tableMeta.rowIndex])}
              />
              <DeleteOutline
                className="ListDelete"
                onClick={() => handleDelete(value)}
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
    <div>
      <div className="navView">
        <div className="component-titleContainer">
          {allowedRoll(19) !== false && (
            <div className="formItem">
              <FormControl fullWidth>
                <InputLabel id="clients">Client</InputLabel>
                <Select
                  labelId="clients"
                  value={filterData.clientId}
                  defaultValue=""
                  label="clients"
                  onChange={(event) => {
                    setFilterData({
                      ...filterData,
                      clientId: event.target.value,
                    });
                  }}
                  fullWidth
                  required>
                  <MenuItem key="" value="All">
                    All
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
          )}
          {allowedRoll(19) !== false && (
            <div className="byType">
              <FormControl fullWidth>
                <InputLabel>UserType</InputLabel>
                <Select
                  value={filterData.userType}
                  label="User Type"
                  onChange={(event) => {
                    setFilterData({
                      ...filterData,
                      userType: event.target.value,
                    });
                  }}
                  required>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="External">External</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {/* <h2 className="component-title">User Lists</h2> */}
          <ToastContainer />
          <Link style={{ textDecoration: "none" }} to="crud">
            <Button
              startIcon={<PersonAdd />}
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                textDecoration: "none",
                background:
                  "linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7))",
              }}>
              Create
            </Button>
          </Link>
        </div>{" "}
        {loading ? (
          <LinearProgress />
        ) : (
          <MUIDataTable
            data={data}
            columns={columns}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
              },
              rowsPerPage: 10,
              rowsPerPageOptions: [10, 20, 50],
              jumpToPage: true,
              search: true,
              selectableRows: "none",
              selectableRowsOnClick: false,
            }}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
}
