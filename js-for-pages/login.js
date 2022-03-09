import { showPage } from "../utils.js"

export function setupLoginHandlers() {
  document.getElementById("btn-login").onclick = login
  //Remove after initial demo
  document.getElementById("btn-login2").onclick = dummyLoginAdmin
}

function login() {
  //Here you have to do the REAL LOGIN upgainst the backend
  const token = "this simultas the token you wil get from a real login"
  setLoginState(token, "USER")
  showPage("page-about")

}
function dummyLoginAdmin() {
  //We will remove this when we start to connect to the backend
  const token = "this simultas the token you wil get from a real login"
  setLoginState(token, "ADMIN")
  showPage("page-about")
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