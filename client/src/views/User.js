import React, { useEffect, useRef, useState } from "react";
import logo from "../../src/img/gopro.png";
import Users from "../components/gestionnaire/Users";
import Home from "../components/user/Home";
import "../App.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  MenuItem,
} from "@mui/material";

import Profile from "../components/Profile";
import Projects from "../components/user/Projects";
import jwtDecode from "jwt-decode";

function User() {
  const navigate = useNavigate();
  axios.interceptors.request.use(
    (config) => {
      // Get the token from local storage
      const token = localStorage.getItem("token");

      // Set the token in the headers
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      // Handle request error
      console.log("An error occurred while making the request:", error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // Return response as-is for successful requests
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          title: error.response.status,
          text: error.response.data.message,
          icon: "warning",
          confirmButtonColor: "#57c496",
          confirmButtonText: "OK",
        });
        if (error.response.data.message === "Invalid token") {
          localStorage.removeItem("token");
          navigate("/welcome");
        }
      } else {
        console.log("An error occurred in the response:", error);
      }

      return Promise.reject(error);
    }
  );
  const [item, setitem] = useState(1);
  const [query, setquery] = useState("");
  const [SearchResult, setSearchResult] = useState([]);
  const [userId, setUserId] = useState();


  const currentDate = new Date();

  const Dateoptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("fr-FR", Dateoptions);

  function handleLogout() {
    Swal.fire({
      title: "Do you really want to disconnect ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#57c496",
      cancelButtonColor: "#fd7238",
      confirmButtonText: "oui",
      cancelButtonText: "non",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/welcome");
      }
    });
  }

  const onSearch = (q) => {
    setquery(q);
    if (q !== "") {
      axios
        .get(`http://localhost:3001/projet/searchItemForUser?item=${q}&id_user=${userId}`, {})
        .then((result) => {
          const { projects, taches } = result.data;
          const formattedSearchResult = projects.map((project) => ({
            id: project.id_projet,
            type: "project",
            title: project.titre,
          }));
          taches.forEach((task) => {
            formattedSearchResult.push({
              id: task.id_tache,
              type: "task",
              title: task.designation,
              id_projet: task.id_projet,
            });
          });
          setSearchResult(formattedSearchResult);

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const ITEM_HEIGHT = 45;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (query !== "") {
      setAnchorEl(event.currentTarget);
    }
  };
  const childRef = useRef(null);
  const handleClose = (option) => {
    setAnchorEl(null);
    setquery("")
    
    if (option.type === 'project') {
      if (childRef.current) {
        childRef.current.changeProject(3,option.id);
      }
    } else if (option.type === 'task') {
      if (childRef.current) {
        childRef.current.changeTask(4,option.id,option.id_projet);
      }
    }
    
    // setselectedUser(option.id)
    
    
     
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.id)
  }, []);

  

  
  

  return (
    <div>
      <section id="sidebar">
        <div class="logo">
          <img src={logo} alt="gopro logo" />
        </div>
        <ul class="side-menu top" style={{marginBottom:"290px"}}>
          <li
            className={item === 1 ? "active" : ""}
            onClick={() => {
              setitem(1);
            }}
          >
            <a href="#">
              <i class="bx bx-home-alt"></i>
              <span class="text">Home</span>
            </a>
          </li>
          <li
            className={(item === 2 ||item === 3 ||item === 4 ||item === 5 ||item === 6) ? "active" : ""}
            onClick={() => {
              setitem(2);
            }}
          >
            <a href="#">
            <i class='bx bxs-wink-smile'></i>
              <span class="text">my space</span>
            </a>
          </li>
          

         
        </ul>
        <div class="bottom">
          <ul class="side-menu">
            {/* <!-- <li>
				<a href="#">
					<i class='bx bxs-cog' ></i>
					<span class="text">Settings</span>
				</a>
			</li> --> */}
            <li onClick={handleLogout} >
              <a href="#" class="logout">
                <i class="bx bxs-log-out-circle"></i>
                <span class="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="content">
        <nav>
          <div class="date">
            <i class="bx bx-calendar bx-sm"></i>
            <h4>{formattedDate}</h4>
          </div>
          <form action="#">
            <div className="form-input">
              <input
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => onSearch(e.target.value)}
              />

              <button type="submit" disabled className="search-btn">
                <i
                  className="bx bx-search"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                ></i>
              </button>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "61%",
                    marginTop: "12px",
                    marginLeft: "-70px",
                  },
                }}
              >
                {SearchResult.length > 0 ? (
                  SearchResult.map((option) => (
                    <MenuItem key={option.id} onClick={() => handleClose(option)}>
                    <b>{option.type}{' : '}</b>{option.title}
                  </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No results found.</MenuItem>
                )}
              </Menu>
            </div>
            {/* <Grid
              container
              spacing={0.1}
              style={{ marginTop: "20px" }}
              fullwidth
            >
              <Grid item xs={12}>
                <div class="form-input">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => onSearch(e.target.value)}
                  />
                  <button type="submit" disabled class="search-btn">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </Grid>
               <SearchBar SearchResult={SearchResult}/> 
            </Grid> */}
          </form>
          <a href="#" class="profile" onClick={() => setitem(7)}>
            <i class="bx bx-user bx-sm"></i>
          </a>
        </nav>
        <main>
          {item === 1 && <Home setitem={setitem}/>}
          {item === 7 && <Profile />}
          {(item === 2 || item === 3 || item === 4 || item === 5 || item === 6 ) && <Projects  setitem={setitem} item={item} userId={userId} ref={childRef}/>}
        </main>
      </section>
    </div>
  );
}

export default User;
