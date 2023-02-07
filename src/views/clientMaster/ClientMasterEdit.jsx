import { PersonAdd } from '@material-ui/icons';
import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// import "./Clientmasterlist.css";

export default function Clientmasteredit() {
  var navigate = useNavigate();
  return (
    <div className="navView">
      <div className="component-titleContainer">
        <h2 className="component-title">Edit Clientmaster</h2>
        <Link style={{ textDecoration: "none" }} to="/dashboard/clientmaster">
          <Button
            startIcon={<PersonAdd />}
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ textDecoration: "none" }}>
            Create
          </Button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <div className="newcmItem">
                  <TextField
                    id="clientmastername"
                    label="Clientmaster Name"
                    variant="outlined"
                  />
                </div>
                <div className="newcmItem">
                  <ButtonGroup disableElevation variant="contained">
                    <Button
                      startIcon={<SaveIcon />}
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => {
                        navigate("/dashboard/clientmaster");
                      }}>
                      Save
                    </Button>
                    {/* <Button
                      endIcon={<DeleteIcon />}
                      color="secondary"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                    >
                      Discard
                    </Button> */}
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
