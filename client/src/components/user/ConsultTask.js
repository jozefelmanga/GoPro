import { Avatar, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
                InputProps={{
                  readOnly: true,
                  style: { cursor: "default" },
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
              InputProps={{
                readOnly: true,
                style: { cursor: "default" },
              }}
              fullWidth
              InputLabelProps={description !== "" ? { shrink: true } : {}}
              style={{ marginTop: "12px", marginBottom: "12px" }}
              value={description}
              onChange={(e) => onInputChange(e)}
            />
            
          </Grid>
        </Grid>
      </div>

      {users.length !== 0 && (
        <div class="table-data">
          <div class="order">
            <div class="head">
              <h3>Concerned people</h3>
              
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
