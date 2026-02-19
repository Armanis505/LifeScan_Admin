const authUser = async ({ nc, password }) => {
  const CleanNc = nc.trim();
  const CleanPassword = password.trim();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (CleanNc === "23303050620216" && CleanPassword === "admin123") {
        resolve(console.log("Autenticación exitosa"));
      } else {
        reject(new Error("Credenciales inválidas, por favor intente de nuevo."));
      }
    }, 1000);
  });

};

export default authUser;

export const LogOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};