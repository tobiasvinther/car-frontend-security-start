import { showPage } from "../utils.js"
import {SERVER} from "../settings.js"
import {makeOptions} from "../fetchUtils.js";

const URL = SERVER +"/auth/login"

export function setupLoginHandlers() {
  document.getElementById("btn-login").onclick = login
}

function login() {
  const user = {}
  user.userName = document.getElementById("username").value
  user.password=document.getElementById("password").value
  //Here you have to do the REAL LOGIN upgainst the backend
  fetch(URL,makeOptions("POST",user))
      .then(res => {
        if(!res.ok){
          if(res.status === 401){
            return Promise.reject("Wrong username or password")
          }
        }
        return res.json()
      })
      .then(response => {
        const token = response.token
        const role = response.roles[0];
        setLoginState(token, role)
        showPage("page-about")
      })
      .catch(e => {document.getElementById("login-error").innerText = e})
}

export function logout() {
  setLoginState(null)
  showPage("page-about")
}

export function setLoginState(token, loggedInAs) {
  if (token) {
    sessionStorage.setItem("token", token)
    if (loggedInAs) {
      sessionStorage.setItem("logged-in-as", loggedInAs)
    }
  } else {
    sessionStorage.clear("token")
    sessionStorage.clear("logged-in-as")
  }
  updateLoginDependentComponents()
}

export function updateLoginDependentComponents() {
  const loggedIn = sessionStorage.getItem("token")
  const loggedInAs = sessionStorage.getItem("logged-in-as")
  document.getElementById("logged-in-user").style.display = "none"
  document.getElementById("logged-in-admin").style.display = "none"
  document.getElementById("not-logged-in").style.display = "block"
  document.getElementById("user-role").innerText = ""
  if (loggedInAs === "ADMIN") {
    document.getElementById("logged-in-admin").style.display = loggedIn ? "block" : "none"
  }
  if (loggedInAs === "USER") {
    document.getElementById("logged-in-user").style.display = loggedIn ? "block" : "none"
  }
  if (loggedIn) {
    document.getElementById("not-logged-in").style.display = "none"
    document.getElementById("user-role").innerText = "Logged in as: " + loggedInAs
  }
  document.getElementById("page-login").style.display = loggedIn ? "none" : "block"
  document.getElementById("page-logout").style.display = loggedIn ? "block" : "none"
}