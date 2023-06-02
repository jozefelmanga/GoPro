import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UpdateUser(props) {
  const navigate=useNavigate();
  const [profile, setprofile] = useState([
    {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      login: "",
      pwd: "",
      role: "",
    },
  ]);

  const { nom, prenom, email, telephone, role } = profile;
  const onInputChange = (e) => {
    setprofile({ ...profile, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadprofile();
  }, []);

  const loadprofile = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:3001/user/getUserById?id_user=${props.selectedUser}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.user[0]);
        setprofile(result.data.user[0]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          Swal.fire({
            title:error.response.status,
            text: error.response.data.message,
            icon: "warning",
            confirmButtonColor: "#57c496",
            confirmButtonText: "ok",
          });
          if (error.response.data.message==="Invalid token") {
            localStorage.removeItem("token")
            navigate("/welcome");
          }
          
        } else {
          
          console.log("An error occurred:", error.message);
        }
      });
  };

  const onSubmit = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3001/user/update", profile ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "updated successfully",
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
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          Swal.fire({
            title:error.response.status,
            text: error.response.data.message,
            icon: "warning",
            confirmButtonColor: "#57c496",
            confirmButtonText: "ok",
          });
          if (error.response.data.message==="Invalid token") {
            localStorage.removeItem("token")
            navigate("/welcome");
          }
          
        } else {
          
          console.log("An error occurred:", error.message);
        }
      });
  };


  const Credentials = async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Update Credentials',
        html:
          'login <input id="login" class="swal2-input">' +
          'password <input id="password" type="password" class="swal2-input">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: "#57c496",
        cancelButtonColor: "#fd7238",
        preConfirm: () => {
          return [
            document.getElementById('login').value,
            document.getElementById('password').value
          ]
        }
      })
      
      if (formValues) {
        if(formValues[0]!=="" && formValues[1]!==""){
          const token = localStorage.getItem("token");
      axios
        .post(`http://localhost:3001/user/changeCredentials`,{pwd :formValues[1], login:formValues[0] ,id_user:props.selectedUser},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.data.success) {
            Swal.fire({
              
              icon: "success",
              
              confirmButtonColor: "#57c496",
              // confirmButtonText: "ok",
            });
          }else{
            Swal.fire({
              text: result.data.message,
              icon: "warning",
              confirmButtonColor: "#57c496",
              confirmButtonText: "ok",
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            Swal.fire({
              title:error.response.status,
              text: error.response.data.message,
              icon: "warning",
              confirmButtonColor: "#57c496",
              confirmButtonText: "ok",
            });
            if (error.response.data.message==="Invalid token") {
              localStorage.removeItem("token")
              navigate("/welcome");
            }
            
          } else {
            
            console.log("An error occurred:", error.message);
          }
        });


        }else{Swal.fire({
        text: `all fields are requiered`,
        icon: "warning",
        confirmButtonColor: "#57c496",
        confirmButtonText: "ok",
      });}
      } 
  };

  return (
    <div>
      <div class="component" id="Profile">
      <div class="head-title">
          <div class="left">
            
          </div>
          <p class="submit-form" style={{backgroundColor :"#fd7238"}} onClick={() => Credentials()} >
            <span class="text"> Update Credentials</span>
          </p>
        </div>
        <div>
          <div class="todo">
            <div class="head">
              <h3>user : </h3>
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
                    label="First name"
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
                    label="Last name"
                    name="prenom"
                    variant="filled"
                    fullWidth
                    style={{ margin: "12px 0" }}
                    InputLabelProps={prenom !== "" ? { shrink: true } : {}}
                    value={prenom}
                    onChange={(e) => onInputChange(e)}
                  />
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
                <Grid xs={11} style={{ marginTop: "15px" }}>
                  <FormControl fullWidth>
                    {/* <InputLabel id="role">role</InputLabel>
            <Select
                labelId="role"
                id="demo-simple-select"
                name="role"
                defaultValue={role}
                label="role"
                onChange={(e) => onInputChange(e)}
            >
                  <MenuItem value="user" >User</MenuItem>
                  <MenuItem value="gestionnaire">Manager</MenuItem>
            </Select> */}
                    <FormControlLabel
                      control={
                        <Radio
                          checked={role === "user"}
                          onChange={() =>
                            setprofile({ ...profile, role: "user" })
                          }
                          value="user"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "user" }}
                        />
                      }
                      label="User"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={role === "gestionnaire"}
                          onChange={() =>
                            setprofile({ ...profile, role: "gestionnaire" })
                          }
                          value="gestionnaire"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "gestionnaire" }}
                        />
                      }
                      label="Manager"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid spacing={0.5} xs={12} style={{ marginTop: "30px" }}>
                <p
                  class="submit-form"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  <span class="text">update user</span>
                </p>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
