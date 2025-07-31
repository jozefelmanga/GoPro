import React, { useState } from "react";
import logo from "../../src/img/gopro.png";
import Home from "../components/admin/Home";
import "../App.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, MenuItem } from "@mui/material";

import ProfileAdmin from "../components/admin/ProfileAdmin";
import AddUser from "../components/admin/AddUser";
import UpdateUser from "../components/admin/UpdateUser";

function Admin() {
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
  const [selectedUser, setselectedUser] = useState();
  const [item, setitem] = useState(1);
  const [query, setquery] = useState("");
  const [SearchResult, setSearchResult] = useState([]);

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
      confirmButtonText: "Yes",
      cancelButtonText: "No",
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
        .get(`http://localhost:3001/user/searchUser?item=${q}`)
        .then((result) => {
          const { users } = result.data;
          const formattedSearchResult = users.map((user) => ({
            id: user.id_user,
            user: user.nom + " " + user.prenom,
          }));

          setSearchResult(formattedSearchResult);
          console.log(formattedSearchResult);
        })
        .catch((error) => {});
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
  const handleClose = (option) => {
    setAnchorEl(null);
    setquery("");
    if (option.id) {
      setitem(4);
      setselectedUser(option.id);
    }
  };

  return (
    <div>
      <section id="sidebar">
        <div class="logo">
          <img src={logo} alt="gopro logo" />
        </div>
        <ul class="side-menu top" style={{ marginBottom: "290px" }}>
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
            className={item === 3 ? "active" : ""}
            onClick={() => {
              setitem(3);
            }}
          >
            <a href="#">
              <i class="bx bx-plus-circle"></i>
              <span class="text">Add user</span>
            </a>
          </li>
        </ul>
        <div class="bottom">
          <ul class="side-menu">
            <li onClick={handleLogout}>
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
                    <MenuItem
                      key={option.id}
                      onClick={() => handleClose(option)}
                    >
                      {option.user}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No results found.</MenuItem>
                )}
              </Menu>
            </div>
          </form>
          <a href="#" class="profile" onClick={() => setitem(2)}>
            <i class="bx bx-user bx-sm"></i>
          </a>
        </nav>
        <main>
          {item === 1 && (
            <Home setitem={setitem} setselectedUser={setselectedUser} />
          )}
          {item === 2 && <ProfileAdmin />}
          {item === 3 && <AddUser setitem={setitem} />}
          {item === 4 && (
            <UpdateUser
              key={selectedUser}
              selectedUser={selectedUser}
              setitem={setitem}
            />
          )}
        </main>
      </section>
    </div>
  );
}

export default Admin;
