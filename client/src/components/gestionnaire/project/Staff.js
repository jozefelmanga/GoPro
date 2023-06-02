import React, { useEffect, useState ,forwardRef , useImperativeHandle} from "react";
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

  const chooseUser = () => {
    axios
      .get(`http://localhost:3001/projet/notaStaff/${props.projectId}`, {})
      .then((result) => {
        if (result.data.users.length===0) {
            Swal.fire({
                title: "there is no users to add",
                confirmButtonColor: "#57c496",
                confirmButtonText: "ok",
              });
        }else{
        const users = result.data.users.map(({ id_user, nom, prenom }) => ({
          id_user,
          name: `${nom} ${prenom}`,
        }));

        Swal.fire({
          title: "select a user",
          input: "select",
          inputOptions: users.reduce((options, user) => {
            options[user.id_user] = user.name;
            return options;
          }, {}),
          showCancelButton: true,
          confirmButtonColor: "#57c496",
          confirmButtonText: "confirmer",
          cancelButtonText: "annuler",
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((resp) => {
          if (resp.isConfirmed) {
            axios
              .post("http://localhost:3001/projet/affectuser", {id_user:resp.value, id_projet : props.projectId})
              .then((result) => {
                Swal.fire({
                    title: "user has been affected",
                    icon: "success",
                    confirmButtonColor: "#57c496",
                    confirmButtonText: "ok",
                  });
                loadStaff()
              })
              .catch((error) => {
                console.log(error);
              });
            //  setClientId(resp.value)
            //  setitem(2)
          }
        });
    }})
      .catch((error) => {
        console.log(error);
      });
  };

  useImperativeHandle(ref,()=>({chooseUser}))


  function deleteClient(id) {
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
        axios.delete(`http://localhost:3001/projet/deleteUserFromProjet?id_user=${id}&id_projet=${props.projectId}`)
          .then((result) => {
            if (result.data.success) {
                 Swal.fire({
                text: "user has been removed successfully",
                icon: "success",
                confirmButtonColor: "#57c496",
                confirmButtonText: "ok",
              });
              loadStaff();
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
            Swal.fire("désolé", "il y une erreur dans la requête", "error");
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
                    <td>
                    <i class="bx bxs-x-circle bx-xs"onClick={() => {
                          deleteClient(st.id_user);
                        }}></i>
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

export default forwardRef(Staff) ;
