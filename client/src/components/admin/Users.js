import React, { useEffect, useState } from "react";
import picture from "../../img/people.png";
import "../../App.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Avatar } from "@mui/material";

function Users(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios
      .get("http://localhost:3001/user/getAllAcounts", {})
      .then((result) => {
        // console.log(result)
        setUsers(result.data.users);
      })
      .catch((error) => {
      });
  };

  function deleteUser(id) {
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
        axios.delete(`http://localhost:3001/user/delete?id_user=${id}`)
          .then((result) => {
            if (result.data.success) {
                 Swal.fire({
                text: "user has been removed successfully",
                icon: "success",
                confirmButtonColor: "#57c496",
                confirmButtonText: "ok",
              });
              loadUsers();
            }else{
                Swal.fire({
                    text: result.data.message,
                    icon: "warning",
                    confirmButtonColor: "#57c496",
                    confirmButtonText: "ok",
                  });
            }
           
          })
          .catch((error) => {
          });
      }
    });
  }

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
        <div class="table-data">
          <div class="order">
            <div class="head">
              <h3>List of users</h3>
              {/* <p class="submit-form"  onClick={() => {
               props.setitem(3)
              }}><i class='bx bx-plus-circle'></i>
            <span class="text"> add user</span>
          </p> */}
            </div>
            <table>
            <thead>
              <tr>
              <th>Avatar</th>
                <th>First name</th>
                <th style={{ width: "20%" }}>Last name</th>
                <th>email</th>
                <th>telephone</th>
                <th></th>
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
                      <p>{user.prenom}</p>
                    </td>
                    <td>
                      <p>{user.nom}</p>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span>{user.telephone}</span>
                    </td>
                    <td>
                    <i class='bx bxs-edit-alt'onClick={() => {
                          props.setselectedUser(user.id_user)
                          props.setitem(4)
                        }}
                        style={{cursor:"pointer"}}></i>{" "}
                    <i class="bx bxs-x-circle bx-xs"onClick={() => {
                          deleteUser(user.id_user);
                        }}style={{cursor:"pointer"}}></i>
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
