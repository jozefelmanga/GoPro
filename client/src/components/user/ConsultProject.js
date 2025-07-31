import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ConsultProject(props) {
  const [project, setProject] = useState([
    {
      date_creation: "",
      titre: "",
      deadline: "",
      description: "",
      id_projet: props.projectId,
    },
  ]);

  useEffect(() => {
    loadproject();
  }, []);



  const loadproject = () => {
    axios
      .get(
        `http://localhost:3001/projet/getProjectById?id_projet=${props.projectId}`
      )
      .then((result) => {
        // console.log(result.data.tache);
        setProject(result.data.projet[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { titre, deadline, description, date_creation } = project;
  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

 
 

  return (
    <div>
      <div class="todo">
        <div class="head">
          <h3>project : {titre}</h3>
        </div>
        <Grid container spacing={0.5} style={{ margin: "-40px 12px 12px 12px" }}>
          <Grid spacing={0.5} xs={6}>
            <Grid xs={11}>
              <TextField
                id="filled-basic"
                label="Label"
                name="titre"
                variant="filled"
                fullWidth
                InputLabelProps={titre !== "" ? { shrink: true } : {}}
                style={{ margin: "12px 0" }}
                value={titre}
                onChange={(e) => onInputChange(e)}
                InputProps={{
                  readOnly: true,
                  style: { cursor: "default" },
                }}
              />
            </Grid>
            <Grid xs={11}>
              <TextField
                id="filled-basic"
                label="date_creation"
                name="date_creation"
                variant="filled"
                fullWidth
                type="date"
                style={{ margin: "12px 0" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={date_creation ? date_creation.split("T")[0] : ""}
                onChange={(e) => onInputChange(e)}
                InputProps={{
                  readOnly: true,
                  style: { cursor: "default" },
                }}
              />
            </Grid>
            <Grid xs={11}>
              <TextField
                id="filled-basic"
                label="Deadline"
                name="deadline"
                variant="filled"
                fullWidth
                type="date"
                style={{ margin: "12px 0" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={deadline ? deadline.split("T")[0] : ""}
                onChange={(e) => onInputChange(e)}
                InputProps={{
                  readOnly: true,
                  style: { cursor: "default" },
                }}
              />
            </Grid>
          </Grid>
          <Grid spacing={0.5} xs={6}>
            <TextField
              id="filled-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={5}
              variant="filled"
              fullWidth
              InputLabelProps={description !== "" ? { shrink: true } : {}}
              style={{ marginTop: "12px", marginBottom: "12px" }}
              value={description}
              onChange={(e) => onInputChange(e)}
              InputProps={{
                readOnly: true,
                style: { cursor: "default" },
              }}
            />
          </Grid>
        </Grid>
      </div>

    
        
    </div>
  );
}

export default ConsultProject;
