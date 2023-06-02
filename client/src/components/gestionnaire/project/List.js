import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";

function List(props) {
  const [projects, setUsers] = useState([]);
  
  const [selectedProject, setSelectedProject] = useState([]);
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    props.setProjectId(event.currentTarget.id);
    setSelectedProject(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    axios
      .get("http://localhost:3001/projet/getList", {})
      .then((result) => {
        setUsers(result.data.projects);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  function deleteProject() {
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
          .delete(`http://localhost:3001/projet/delete?id_projet=${selectedProject}`)
          .then((result) => {
            if (result.data.success) {
              Swal.fire({
                text: "project has been deleted successfully",
                icon: "success",
                confirmButtonColor: "#57c496",
                confirmButtonText: "ok",
              });
              loadProjects();
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
          .post("http://localhost:3001/projet/updateStatus", {
            etat: status[resp.value],
            id_projet: selectedProject,
          })
          .then((result) => {
            Swal.fire({
              title: "status has been changed",
              icon: "success",
              confirmButtonColor: "#57c496",
              confirmButtonText: "ok",
            });
            loadProjects();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <ul class="box-projects">
      {projects.map((project, index) => {
        return (
          <li class={project.etat} key={index}>
            <div class="text">
              <h3
                onClick={() => {
                  props.setProjectId(project.id_projet);
                  props.setContent(2);
                }}
                style={{ cursor: "pointer" }}
              >
                {project.titre}
              </h3>
              <i
                class="bx bx-dots-horizontal-rounded bx-md"
                id={project.id_projet}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              ></i>
              <p
                onClick={() => {
                  props.setProjectId(project.id_projet);
                  props.setContent(2);
                }}
                style={{ cursor: "pointer" }}
              >
                {project.description}
              </p>
            </div>
          </li>
        );
      })}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={changeStatus}>status</MenuItem>
        <MenuItem onClick={()=>{props.setContent(7)}}>edit</MenuItem>
        <MenuItem onClick={deleteProject}>delete</MenuItem>
      </Menu>
      
    </ul>
  );
}

export default List;
