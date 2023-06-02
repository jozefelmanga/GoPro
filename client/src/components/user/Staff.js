import React, { useEffect, useState } from "react";
// import "../../App.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Avatar } from "@mui/material";


function Staff(props,ref) {
  const [Staff, setStaff] = useState([]);

 

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = () => {
    axios
      .get(`http://localhost:3001/projet/usersByProject/${props.projectId}`, {})
      .then((result) => {
        setStaff(result.data.staff);
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
      
        
        <div class="table-data">
          <div class="order">
            <div class="head">
              <h3>Staff</h3>
              
            </div>
            <table>
            <thead>
              <tr>
              <th>Avatar</th>
                <th style={{ width: "20%" }}>last name</th>
                <th>first name</th>
                <th>email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              {Staff.map((st, index) => {
                return (
                  <tr key={index}>
                    <td>
                    <Avatar {...stringAvatar(st.prenom +" "+st.nom )} />
                    </td>
                    <td>
                      <p>{st.nom}</p>
                    </td>
                    <td>
                      <p>{st.prenom}</p>
                    </td>
                    <td>{st.email}</td>
                    <td>
                      <span>{st.telephone}</span>
                    </td>
                   
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default Staff ;
