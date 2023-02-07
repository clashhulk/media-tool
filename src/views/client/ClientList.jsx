import './client.css';
import 'react-toastify/dist/ReactToastify.css';

import { DeleteOutline, Edit, PersonAdd } from '@material-ui/icons';
import { Button, LinearProgress } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { clientDelete, clientList } from '../../adapter/ClientAdapter';

export default function Clientlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const response = clientList();
    response.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        setData(result.data.clients);
      } else {
        toast.error(result.message);
      }
    });
  }, []);
  const handleEdit = (client) => {
    // navigate("/dashboard/client/edit/", { state: user });
    // const handleEdit = (user) => {
    navigate("/dashboard/client/crud/", { state: client });
    // };
  };
  const handleDelete = (id) => {
    const dinfo = clientDelete(id);
    dinfo.then(function (result) {
      if (result.status === "Success") {
        toast.success(result.data.company_name + " " + result.message);
        setData(data.filter((item) => item.id !== id));
      } else {
        toast.error(result.message);
      }
    });
  };

  const columns = [
    {
      name: "id",
      label: "Id",
      width: 80,
      options: {
        filter: false,
        sort: true,
      },
    },
    // {
    //   name: "username",
    //   label: "Client Name",
    //   width: 200,
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
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
      name: "company_type",
      label: "Company type",
      width: 200,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      width: 150,
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone no",
      width: 150,
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      width: 250,
      options: {
        filter: false,
        sort: true,
      },
    },

    {
      name: "id",
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
    <>
      <div className="navView">
        <div className="component-titleContainer">
          <ToastContainer />
          <h2 className="component-title">Clients List</h2>
          <Link style={{ textDecoration: "none" }} to="add">
            <Button
              startIcon={<PersonAdd />}
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                background:
                  "linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7))",
              }}>
              Create
            </Button>
          </Link>
        </div>
        {loading ? (
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
            }}
          />
        )}
      </div>
      <Outlet />
    </>
  );
}
