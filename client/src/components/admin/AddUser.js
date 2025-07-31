import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";

function AddUser(props) {
  const [profile, setprofile] = useState([
    {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      login: "",
      pwd: "",
      role: "user",
    },
  ]);

  const { nom, prenom, email, telephone, login, pwd, role } = profile;
  const onInputChange = (e) => {
    setprofile({ ...profile, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/user/add", profile)
      .then((result) => {
        if (result.data.success) {
          Swal.fire({
            title: "user added successfully",
            icon: "success",
            confirmButtonColor: "#57c496",
            confirmButtonText: "ok",
          });
          props.setitem(1);
        } else {
          Swal.fire({
            text: result.data.message,
            icon: "warning",
            confirmButtonColor: "#57c496",
            confirmButtonText: "ok",
          });
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div class="component" id="Profile">
        <div>
          <div class="todo">
            <div class="head">
              <h3>add user : </h3>
            </div>
            <Grid
              container
              spacing={0.5}
              style={{ margin: "-40px 12px 12px 12px" }}
            >
              <Grid spacing={0.5} xs={4}>
                <Grid xs={11}>
                  <TextField
                    id="filled-basic"
                    label="Last name"
                    name="nom"
                    variant="filled"
                    fullWidth
                    InputLabelProps={nom !== "" ? { shrink: true } : {}}
                    style={{ margin: "12px 0" }}
                    value={nom}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid xs={11}>
                  <TextField
                    id="filled-basic"
                    label="First name"
                    name="prenom"
                    variant="filled"
                    fullWidth
                    style={{ margin: "12px 0" }}
                    InputLabelProps={prenom !== "" ? { shrink: true } : {}}
                    value={prenom}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid xs={11} style={{ marginTop: "15px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="role">role</InputLabel>
                    <Select
                      labelId="role"
                      id="demo-simple-select"
                      name="role"
                      value={role}
                      label="role"
                      onChange={(e) => onInputChange(e)}
                    >
                      <MenuItem value="user">user</MenuItem>
                      <MenuItem value="gestionnaire">manager</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid spacing={0.5} xs={4}>
                <Grid xs={11}>
                  <TextField
                    id="filled-multiline-static"
                    label="telephone"
                    name="telephone"
                    variant="filled"
                    fullWidth
                    InputLabelProps={telephone !== "" ? { shrink: true } : {}}
                    style={{ marginTop: "12px", marginBottom: "12px" }}
                    value={telephone}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid xs={11}>
                  <TextField
                    id="filled-basic"
                    label="E-mail"
                    name="email"
                    variant="filled"
                    fullWidth
                    style={{ margin: "12px 0" }}
                    InputLabelProps={email !== "" ? { shrink: true } : {}}
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
              </Grid>
              <Grid spacing={0.5} xs={4}>
                <Grid xs={11}>
                  <TextField
                    id="filled-basic"
                    label="login"
                    name="login"
                    variant="filled"
                    fullWidth
                    style={{ margin: "12px 0" }}
                    InputLabelProps={login !== "" ? { shrink: true } : {}}
                    value={login}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid xs={11}>
                  <TextField
                    id="filled-multiline-static"
                    label="Password"
                    name="pwd"
                    variant="filled"
                    type="password"
                    fullWidth
                    InputLabelProps={pwd !== "" ? { shrink: true } : {}}
                    style={{ marginTop: "12px", marginBottom: "12px" }}
                    value={pwd}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
              </Grid>
              <Grid spacing={0.5} xs={12} style={{ marginTop: "30px" }}>
                <p
                  class="submit-form"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  <span class="text">add user</span>
                </p>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
