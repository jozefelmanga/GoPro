import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";

function Home() {
 
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
        <div class="head-title">
          <div class="left">
            <h1>home</h1>
            <ul class="breadcrumb">
              <li>
                <a class="active" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <a href="#" class="btn-download">
            <i class="bx bxs-cloud-download"></i>
            <span class="text">Download PDF</span>
          </a>
        </div>

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
      </div>
    </div>
  );
}

export default Home;
