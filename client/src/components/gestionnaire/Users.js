import React, { useEffect, useState } from "react";
import picture from "../../img/people.png";
import "../../App.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Avatar } from "@mui/material";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios
      .get("http://localhost:3001/user/list", {})
      .then((result) => {
        // console.log(result)
        setUsers(result.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div class="component" id="users">
        <div class="head-title">
          <div class="left">
            <h1>users</h1>
            <ul class="breadcrumb">
              <li>
                <a href="#">users</a>
              </li>
              {/* <!-- <li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li> --> */}
            </ul>
          </div>
          {/* <div class="right">
            <a href="#" class="btn-download">
              <i class="bx bx-plus-circle"></i>
              <span class="text">add user</span>
            </a>
          </div> */}
        </div>
        
        <div class="table-data">
          <div class="order">
            <div class="head">
              <h3>List of users</h3>
            </div>
            <table>
            <thead>
              <tr>
              <th>Avatar</th>
                <th style={{ width: "20%" }}>nom</th>
                <th>pernom</th>
                <th>email</th>
                <th>telephone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                    <Avatar {...stringAvatar(user.prenom +" "+user.nom )} />
                    </td>
                    <td>
                      <p>{user.nom}</p>
                    </td>
                    <td>
                      <p>{user.prenom}</p>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span>{user.telephone}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
