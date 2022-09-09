// export const isAuthenticated = () => true;
export const isAuthenticated = () => {
  var storage = localStorage.getItem("token");
  if (storage) {
    return true;
  }
  return false;
};