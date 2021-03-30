export function getUserID() {
  return sessionStorage.getItem("username");
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export default {
  getUserID,
  getToken,
};
