import axios from "axios";
import React, { useEffect, useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { Avatar, AvatarGroup, Grid } from "@mui/material";
import Avatars from "./Avatars";
import jwtDecode from "jwt-decode";

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [notTasks, setNotTasks] = useState([]);
  const [taskId, setTaskId] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setTaskId(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    axios
      .get(`http://localhost:3001/tache/myTaskInProject?id_user=${props.userId}&id_projet=${props.projectId}`)
      .then((result) => {
        setTasks(result.data.taches);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(`http://localhost:3001/tache/notMyTaskInProject?id_user=${props.userId}&id_projet=${props.projectId}`)
      .then((result) => {
        setNotTasks(result.data.taches);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  

  const changeStatus = () => {
    handleClose()
    const status = ["pending", "process", "completed"];
    Swal.fire({
      title: "change status",
      input: "radio",
      inputOptions: status,
      showCancelButton: true,
      confirmButtonColor: "#57c496",
      confirmButtonText: "confirmer",
      cancelButtonText: "annuler",
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((resp) => {
      if (resp.isConfirmed) {
        axios
          .post("http://localhost:3001/tache/updateStatus", {
            etat: status[resp.value],
            id_tache: taskId,
          })
          .then((result) => {
            Swal.fire({
              title: "status has been changed",
              icon: "success",
              confirmButtonColor: "#57c496",
              confirmButtonText: "ok",
            });
            loadTasks();
          })
          .catch((error) => {
            console.log(error);
          });
        //  setClientId(resp.value)
        //  setitem(2)
      }
    });
  };

  return (
    <div>
    <div class="todo">
      <div class="head">
        <h3>my Tasks</h3>
      </div>
      <ul class="todo-list">
        {tasks.map((task, index) => {
          return (
            <li class={task.etat} key={index}>
              <Grid container spacing={1} xs={12}>
                <Grid
                  xs={9}
                  style={{ marginTop: "12px", cursor: "pointer" }}
                  onClick={() => {
                    props.setTaskToConsult(task.id_tache);
                    props.setContent(4);
                  }}
                >
                  <p style={{ fontSize: "18px" }}>{task.designation}</p>
                </Grid>
                <Grid xs={3} style={{ marginTop: "5px" }}>
                  <Avatars key={task.id_tache} taskId={task.id_tache} />
                </Grid>
              </Grid>
              <i
                class="bx bx-dots-vertical-rounded"
                id={task.id_tache}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ fontSize: "24px" }}
              ></i>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={changeStatus}>
                  {" "}
                  <p>status</p>
                </MenuItem>
              </Menu>
            </li>
          );
        })}
      </ul>
    </div>

    <div class="todo">
      <div class="head">
        <h3>other tasks</h3>
      </div>
      <ul class="todo-list">
        {notTasks.map((task, index) => {
          return (
            <li class={task.etat} key={index}>
              <Grid container spacing={1} xs={12}>
                <Grid
                  xs={9}
                  style={{ marginTop: "12px", cursor: "pointer" }}
                  onClick={() => {
                    props.setTaskToConsult(task.id_tache);
                    props.setContent(4);
                  }}
                >
                  <p style={{ fontSize: "18px" }}>{task.designation}</p>
                </Grid>
                <Grid xs={3} style={{ marginTop: "5px" }}>
                  <Avatars key={task.id_tache} taskId={task.id_tache} />
                </Grid>
              </Grid>
              
            </li>
          );
        })}
      </ul>
    </div>
    </div>
  );
}

export default Tasks;
