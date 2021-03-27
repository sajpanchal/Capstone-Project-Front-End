export function getUserID() {
  return sessionStorage.getItem("username");
}

export default {
  getUserID,
};
