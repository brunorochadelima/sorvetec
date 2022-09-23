// export const isAuthenticated = () => true;
export const isAuthenticated = () => {
  var storage = sessionStorage.getItem("token");
  if (storage) {
    return true;
  }
  return false;
};