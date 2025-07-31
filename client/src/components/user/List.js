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
      .get(`http://localhost:3001/projet/myprojects?id_user=${props.userId}`, {})
      .then((result) => {
        setUsers(result.data.projects);
      })
      .catch((error) => {
        console.log(error);
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
                  props.setContent(3);
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
        <MenuItem onClick={()=>{props.setContent(6)}}>consult</MenuItem>
      </Menu>
      
    </ul>
  );
}

export default List;
