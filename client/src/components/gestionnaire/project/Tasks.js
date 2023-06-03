import axios from "axios";
import React, { useEffect, useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { Avatar, AvatarGroup, Grid } from "@mui/material";
import Avatars from "./Avatars";

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
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
      .get(`http://localhost:3001/tache/tachesByProject/${props.projectId}`)
      .then((result) => {
        setTasks(result.data.taches);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const chooseUser = () => {
    handleClose()
    axios
      .get(
        `http://localhost:3001/tache/usersInProNoTask?id_projet=${props.projectId}&id_tache=${taskId}`,
        {}
      )
      .then((result) => {
        if (result.data.users.length === 0) {
          Swal.fire({
            title: "no stuff",
            confirmButtonColor: "#57c496",
            confirmButtonText: "ok",
          });
        } else {
          
          const users = result.data.users.map(({ id_user, nom, prenom }) => ({
            id_user,
            name: `${nom} ${prenom}`,
          }));

          Swal.fire({
            title: "select a user",
            input: "select",
            inputOptions: users.reduce((options, user) => {
              options[user.id_user] = user.name;
              return options;
            }, {}),
            showCancelButton: true,
            confirmButtonColor: "#57c496",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((resp) => {
            if (resp.isConfirmed) {
              axios
                .post("http://localhost:3001/tache/affectuser", {
                  id_user: resp.value,
                  id_tache: taskId,
                })
                .then((result) => {
                  Swal.fire({
                    title: "user has been affected",
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function deletetask() {
    handleClose()
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
          .delete(`http://localhost:3001/tache/delete?id_tache=${taskId}`)
          .then((result) => {
            if (result.data.success) {
              Swal.fire({
                text: "task has been deleted successfully",
                icon: "success",
                confirmButtonColor: "#57c496",
                confirmButtonText: "ok",
              });
              loadTasks();
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
            Swal.fire("sorry", "something went wrong", "error");
          });
      }
    });
  }

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
    <div class="todo">
      <div class="head">
        <h3>Tasks</h3>
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
                    props.setContent(5);
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
                <MenuItem onClick={deletetask}>
                  <p>delete</p>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    chooseUser();
                  }}
                >
                  {" "}
                  <p>affect</p>
                </MenuItem>
              </Menu>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tasks;
