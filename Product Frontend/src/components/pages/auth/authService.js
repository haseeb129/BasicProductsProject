import jwtDecode from "jwt-decode";
export function logout() {
  localStorage.removeItem("token");
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

export function loginWithJWT(jwt) {
  localStorage.setItem("token", jwt);
}
export function getJWT() {
  return localStorage.getItem("token");
}
export default {
  getCurrentUser,
  logout,
  loginWithJWT,
  getJWT,
};
