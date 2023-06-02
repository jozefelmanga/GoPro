import React, { useState } from "react";
import "../login.css";
import logo from "../img/gopro.png";
import wave from "../img/wave.png";
import bg from "../img/bg.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const toggle = (event) => {
    if (event.type === "focus") {
      event.target.name === "login" ? setIsFocused1(true) : setIsFocused2(true);
    } else if (event.type === "blur" && event.target.value === "") {
      event.target.name === "login"
        ? setIsFocused1(false)
        : setIsFocused2(false);
    }
  };

  const handleSubmit = (event) => {
	event.preventDefault(); 
	if (login === "" || password === "") {
		Swal.fire("Veuillez remplir tous les champs", "", "info");
	  } else {
		axios.post("http://localhost:3001/user/login", {
		  login: login,
		  pwd: password,
		})
		  .then((result) => {
			  const decodedToken = jwtDecode(result.data.token);
			  localStorage.setItem("token", result.data.token);
        Swal.fire({
          title: "Welcome back 👋",
          icon: "success",
          confirmButtonColor: "#57c496",
          confirmButtonText: "ok",
        });
        switch (decodedToken.role) {
          case "admin":
            navigate("/admin");
            break;
          case "gestionnaire":
            navigate("/manager");
            break;
          case "user":
            navigate("/GoPro");
            break;
          default:
            break;
        }
			}
		  )
		  .catch((result) => {
			Swal.fire(result.response.data.message, "", "info");});
	  }
  };

  return (
    <div>
      <img class="wave" src={wave} alt="wave" />
      <div class="container">
        <div class="img">
          <img src={bg} alt="bg" />
        </div>
        <div class="login-content">
          <form action="index.html" onSubmit={handleSubmit}>
            <img src={logo} alt="logo" />
            <h2 class="title">Welcome</h2>
            <div
              className={isFocused1 ? "input-div one focus" : "input-div one"}
            >
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input
                  type="text"
                  class="input"
                  name="login"
                  onFocus={toggle}
                  onBlur={toggle}
                  onChange={(e) => {
                    setLogin(e.target.value);
                  }}
                />
              </div>
            </div>
            <div  
              className={isFocused2 ? "input-div pass focus" : "input-div pass"}
            >
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input
                  type="password"
                  class="input"
                  name="password"
                  onFocus={toggle}
                  onBlur={toggle}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* <a href="#">Forgot Password?</a> */}
            <input type="submit" class="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
