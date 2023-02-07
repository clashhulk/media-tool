import React from "react";
import {
    MenuItem, Button,
    FormControl, InputLabel, Select
} from '@mui/material';
import Grid from "@material-ui/core/Grid";
import PublishIcon from "@material-ui/icons/Publish";
import { ToastContainer, toast } from "react-toastify";
import CssBaseline from '@material-ui/core/CssBaseline';


function MediaUpload() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="navView">
            <ToastContainer />
                <CssBaseline />
                <form>
                    <Grid container spacing={2}>
                        <Grid item spacing={3} xs={12} md={12} lg={12} xl={12}>
                            <div className="field">
                                <FormControl sx={{ mb: 3 }} fullWidth>
                                    <InputLabel id="SelectMedia">Select Data</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="SelectMedia"
                                        id="SelectMedia"
                                        label="SelectMedia"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Media 1">Media 1</MenuItem>
                                        <MenuItem value="Media 2">Media 2</MenuItem>
                                        <MenuItem value="Media 3">Media 3</MenuItem>
                                        <MenuItem value="Media 4">Media 4</MenuItem>
                                    </Select>
                                </FormControl>

                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    id="mediaFile"
                                    onChange={handleChange}
                                />
                                <label className='upload-file-lable' htmlFor="mediaFile">
                                    Upload File
                                    <Button
                                        startIcon={<PublishIcon />}
                                        variant="contained"
                                        color="primary" component="span">
                                        Upload
                                    </Button>
                                </label>

                                <Button sx={{ mt: 3 }} variant="contained">Submit</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
    );
}

export default MediaUpload;