import { Avatar, AvatarGroup } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Avatars(props) {
    const [users,setUsers]=useState([])
    useEffect(() => {
        loadUsers();
      }, [props.taskId]);

      const loadUsers = () => {
        axios
          .get(`http://localhost:3001/tache/usersBytaches?id_tache=${props.taskId}`)
          .then((result) => {
            // console.log(result.data.users)
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
      {users.length > 0 && (
      <AvatarGroup max={3}>
        { users.map((user, index) => {
                return ( <Avatar {...stringAvatar(user.prenom +" "+user.nom )} />)
            })}
      </AvatarGroup>)}
    </div>
  );
}

export default Avatars;
