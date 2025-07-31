import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import Users from "./Users";

function Home(props) {
  
  const [statistics, setstatistics] = useState(
    {
      nb_taches: "",
      nb_users: "",
      nb_projects: "",
    },) 
    
    const { nb_users, nb_taches, nb_projects } = statistics;
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    axios
      .get("http://localhost:3001/projet/statistics", {})
      .then((result) => {
        setstatistics(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div class="component" id="home">
        
        <ul class="box-info">
          <li>
          <i class='bx bxl-product-hunt'></i>
            
            <span class="text">
              <h3>{nb_projects}</h3>
              <p>Projects</p>
            </span>
          </li>
          <li>
            <i class="bx bxs-group"></i>
            <span class="text">
              <h3>{nb_users}</h3>
              <p>Users</p>
            </span>
          </li>
          <li>
            <i class="bx bxs-calendar-check"></i>
            <span class="text">
              <h3>{nb_taches}</h3>
              <p>Tasks</p>
            </span>
          </li>
        </ul>

        <Users setitem={props.setitem} setselectedUser={props.setselectedUser}/>
      </div>
    </div>
  );
}

export default Home;
