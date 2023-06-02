import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

function AddTask(props) {
  const [task, setTask] = useState(
    {
      designation: "",
      deadline: "",
      description: null,
      id_projet: props.projectId,
    },
  );

  const { designation, deadline, description } = task;
  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/tache/add", task)
      .then((result) => {
        if (result.data.success) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'task added successfully'
              })
              props.setContent(2);
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
        console.log(error);
      });
  };

  return (
    <div class="todo">
      <div class="head">
        <h3>create a new Task</h3>
      </div>
      <Grid container spacing={0.5} style={{ margin: "-40px 12px 12px 12px" }}>
        <Grid spacing={0.5} xs={6}>
          <Grid xs={11}>
            <TextField
              id="filled-basic"
              label="Label"
              name="designation"
              variant="filled"
              fullWidth
              style={{ margin: "12px 0" }}
              value={designation}
              onChange={(e) => onInputChange(e)}
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
              value={deadline}
              onChange={(e) => onInputChange(e)}
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
            style={{ marginTop: "12px" }}
            value={description}
            onChange={(e) => onInputChange(e)}
          />
        </Grid>
        <Grid spacing={0.5} xs={12} style={{ marginTop: "30px" }}>
          <p class="submit-form"  onClick={() => {
                onSubmit();
              }}>
            <span class="text">add task</span>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddTask;
