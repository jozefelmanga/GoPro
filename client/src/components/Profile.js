import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";

function Profile() {
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
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        loadprofile(decodedToken.id);
      }, []);
    
    
    
      const loadprofile = (id_user) => {
        axios
          .get(
            `http://localhost:3001/user/getUserById?id_user=${id_user}`
          )
          .then((result) => {
            setprofile(result.data.user[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const { nom, prenom, email, telephone } = profile;
 
 
  return (
    <div>
      <div class="component" id="Profile">
        <div class="head-title">
          <div class="left">
            <h1>Profile</h1>
           
          </div>
        </div>
        <div>
      <div class="todo">
        <div class="head">
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
                InputProps={{
                    readOnly: true,
                    style: { cursor: "default" },
                  }}
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
                
                InputProps={{
                  readOnly: true,
                  style: { cursor: "default" },
                }}
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
              InputProps={{
                readOnly: true,
                style: { cursor: "default" },
              }}
            /></Grid>
             <Grid xs={11}>
              <TextField
                id="filled-basic"
                label="E-mail"
                name="email"
                variant="filled"
                fullWidth
                style={{ margin: "12px 0" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={email}
                InputProps={{
                    readOnly: true,
                    style: { cursor: "default" },
                  }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>

    
        
    </div>

       
          
      </div>
    </div>
  );
}

export default Profile;
