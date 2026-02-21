const authUser = async ({ nc, password }) => {
  const CleanNc = nc.trim();
  const CleanPassword = password.trim();

  try {
    const response = await fetch('http://localhost:4000/admins');

    if (!response.ok) {
      throw new Error ("No se pudo establecer conexión");
    }

    const admins = await response.json();

    const user = admins.find(admin => CleanNc === admin.nc && CleanPassword === admin.password);

    if (user) {
      console.log("Autenticación exitosa");
    }
    else {
      throw new Error("Credenciales inválidas, por favor intente de nuevo");
    }
  }
  catch (error) {
    throw new Error(error.message || "Error al iniciar sesión");
  }
};

export default authUser;