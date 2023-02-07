import 'react-toastify/dist/ReactToastify.css';

import { DeleteOutline, Edit, PersonAdd } from '@material-ui/icons';
import { Button, LinearProgress } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { roleDelete, userRoles } from '../../adapter/AccessAdapter.jsx';

const RolesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const info = userRoles();
    info.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        setData(result.data);
      } else {
        toast.error(result.message);
      }
    });
  }, []);

  const handleDelete = (id) => {
    const dinfo = roleDelete(id);
    dinfo.then(function (result) {
      if (result.status === "Success") {
        toast.success(result.data.name + " " + result.message);
        setData(data.filter((item) => item.id !== id));
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleEdit = (value) => {
    navigate("/dashboard/roles/crud", {
      state: data.filter(function (hero) {
        return hero.id === value;
      }),
    });
  };

  const columns = [
    { name: "id", label: "ID", width: 100 },
    {
      name: "name",
      label: "Role",
      width: 200,
    },

    {
      name: "id",
      label: "Action",
      width: 150,
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <>
              <Edit className="ListEdit" onClick={() => handleEdit(value)} />

              <DeleteOutline
                className="ListDelete"
                onClick={() => handleDelete(value)}
              />
            </>
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
        <ToastContainer />
        <div className="component-titleContainer">
          <h2 className="component-title">Roles List</h2>
          <Link style={{ textDecoration: "none" }} to="/dashboard/roles/crud">
            <Button
              startIcon={<PersonAdd />}
              color="secondary"
              fullWidth
              style={{
                background:
                  "linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7))",
              }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
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
              selectableRowsOnClick: false,
            }}
          />
        )}
      </div>
    </>
  );
};
export default RolesList;
