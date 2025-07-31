import { Avatar, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ConsultTask(props) {
  const [task, setTask] = useState([
    {
      id_tache:props.taskToConsult,
      date_creation: "",
      designation: "",
      deadline: "",
      description: null,
      etat: "",
      id_projet: props.projectId,
    },
  ]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadTask();
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios
      .get(
        `http://localhost:3001/tache/usersBytaches?id_tache=${props.taskToConsult}`
      )
      .then((result) => {
        // console.log(result)
        setUsers(result.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadTask = () => {
    axios
      .get(
        `http://localhost:3001/tache/gettacheById?id_tache=${props.taskToConsult}`
      )
      .then((result) => {
        // console.log(result.data.tache);
        setTask(result.data.tache[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { designation, deadline, description, date_creation, etat } = task;
  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/tache/update", task)
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
            title: "task updated successfully",
          });
          props.setContent(2);
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
        console.log(error);
      });
  };

  function deleteConcerd(id) {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "cancel",
      confirmButtonColor: "#57c496",
      cancelButtonColor: "#fd7238",
      confirmButtonText: "confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:3001/tache/deleteUserTache?id_user=${id}&id_tache=${props.taskToConsult}`
          )
          .then((result) => {
            if (result.data.success) {
              Swal.fire({
                text: "user has been removed successfully",
                icon: "success",
                confirmButtonColor: "#57c496",
                confirmButtonText: "ok",
              });
              loadUsers();
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
            Swal.fire("désolé", "il y une erreur dans la requête", "error");
          });
      }
    });
  }


  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name.toUpperCase()),
      },
      children: `${name.split(" ")[0][0].toUpperCase()}${name.split(" ")[1][0].toUpperCase()}`,
    };
  }

  return (
    <div>
      <div class="todo">
        <div class="head">
          <h3>Task</h3>
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
                InputLabelProps={designation !== "" ? { shrink: true } : {}}
                style={{ margin: "12px 0" }}
                value={designation}
                onChange={(e) => onInputChange(e)}
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
            />
            {/* <Select defaultValue={etat} onChange={(e) => onInputChange(e)} fullWidth variant="filled" label="status" >
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="process">In Process</MenuItem>
            </Select> */}
          </Grid>
          <Grid spacing={0.5} xs={12} style={{ marginTop: "30px" }}>
            <p
              class="submit-form"
              onClick={() => {
                onSubmit();
              }}
            >
              <span class="text">update task</span>
            </p>
          </Grid>
        </Grid>
      </div>

      {users.length !== 0 && (
        <div class="table-data">
          <div class="order">
            <div class="head">
              <h3>Concerned people</h3>
              <i class="bx bx-search"></i>
              <i class="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                <th>Avatar</th>
                  <th style={{ width: "20%" }}>last name</th>
                  <th>first name</th>
                  <th>email</th>
                  <th>phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((st, index) => {
                  return (
                    <tr key={index}>
                      <td>
                    <Avatar {...stringAvatar(st.prenom +" "+st.nom )} />
                    </td>
                      <td>
                        <p>{st.nom}</p>
                      </td>
                      <td>
                        <p>{st.prenom}</p>
                      </td>
                      <td>{st.email}</td>
                      <td>
                        <span>{st.telephone}</span>
                      </td>
                      <td>
                        <i
                          class="bx bxs-x-circle bx-xs"
                          onClick={() => {
                            deleteConcerd(st.id_user);
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultTask;
