import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";


function ProfileAdmin(props) {
    const [profile, setprofile] = useState([
        {
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          id_user: "",
        },
      ]);
      
    
      useEffect(() => {
        loadprofile();
      }, []);
    
      const { nom, prenom, email, telephone } = profile;
      const onInputChange = (e) => {
        setprofile({ ...profile, [e.target.name]: e.target.value });
      };
    
      const loadprofile = () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        axios
          .get(
            `http://localhost:3001/user/getUserById?id_user=${decodedToken.id}`
          )
          .then((result) => {
            setprofile(result.data.user[0]);
          })
          .catch((error) => {
          });
      };
    
      const onSubmit = () => {
        axios
          .post("http://localhost:3001/user/update", profile)
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
              // props.setContent(2);
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
          });
      };

      

      const oldpwd = async () => {
        const { value: password } = await Swal.fire({
          title: 'Enter old password',
          input: 'password',
          inputPlaceholder: 'Enter your old password',
          showCancelButton: true,
          confirmButtonColor: "#57c496",
          cancelButtonColor: "#fd7238",
        });
      
        if (password) {

          return axios
            .get(`http://localhost:3001/user/oldpwd?pwd=${password}`)
            .then((result) => {
              if (result.data.success) {
                return true;
              } else {
                return false;
              }
            })
            .catch((error) => {
              
            });
        }
      };
      
      const Credentials = async () => {
        const isOldPasswordCorrect = await oldpwd();
        if (isOldPasswordCorrect) {

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
              const decodedToken = jwtDecode(token);
          axios
            .post(`http://localhost:3001/user/changeCredentials`,{pwd :formValues[1], login:formValues[0],id_user:decodedToken.id})
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
             
            });


            }else{Swal.fire({
            text: `all fields are requiered`,
            icon: "warning",
            confirmButtonColor: "#57c496",
            confirmButtonText: "ok",
          });}
          } 
          
        } else {
          Swal.fire({
            text: `Wrong password`,
            icon: "warning",
            confirmButtonColor: "#57c496",
            confirmButtonText: "ok",
          });
          
        }
      };
      

      
 
  return (
    <div>
      <div class="component" id="Profile">
        <div class="head-title">
          <div class="left">
            <h1>Profile</h1>
          </div>
          <p class="submit-form" style={{backgroundColor :"#fd7238"}} onClick={() => Credentials()} >
            <span class="text"> Update Credentials</span>
          </p>
        </div>
        <div>
      <div class="todo">
        <div class="head" >
          <h3>profile : </h3>
          
        </div>
        <Grid container spacing={0.5} style={{ margin: "-40px 12px 12px 12px" }}>
          <Grid spacing={0.5} xs={6}>
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
          <Grid spacing={0.5} xs={6}>
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
            /></Grid>
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
          <Grid spacing={0.5} xs={12} style={{ marginTop: "30px" }}>
            <p
              class="submit-form"
              onClick={() => {
                onSubmit();
              }}
            >
              <span class="text">update profile</span>
            </p>
            
          </Grid>
        </Grid>
      </div>

    
        
    </div>

       
          
      </div>
    </div>
  );
}

export default ProfileAdmin;
