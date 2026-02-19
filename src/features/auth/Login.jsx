import LifeScanTitle from "../../components/ui/LifeScanTitle";
import ValidationMessage from "../../components/ui/ValidationMessage";
import Navbar from "../../components/layout/dashboard/Navbar";
import ButtonAccept from "../../components/ui/ButtonAccept";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import authUser from "../../services/loginValidator";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [serverError, setServerError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (auth.isAuthenticated) {
    return <Navigate to="/homepage" />;
  }

  const handleLogin = async (data) => {
    setIsLoading(true);
    setServerError("");

    try {
      await authUser(data);
      auth.setIsAuthenticated(true);
    } catch (error) {
      setServerError(
        error.message || "Error de autenticación, por favor intente de nuevo.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 h-screen">
      <div className="flex justify-end p-5">
        <ButtonAccept text={"Solicitar registro"} />
      </div>
      <div className="flex items-center justify-center">
        <LifeScanTitle size="text-5xl" />
      </div>

      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl border border-slate-600 p-8">
          <header className="mb-5">
            <h1 className="text-2xl font-bold text-white text-center">
              Bienvenido
            </h1>
            <p className="text-slate-400 text-sm text-center mt-2">
              Ingresa tus credenciales
            </p>
          </header>

          <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Número de control
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-slate-500"
                placeholder="Ej: 123456789012"
                maxLength={14}
                {...register("nc", {
                  required: "Ingrese su número de control",
                  pattern: {
                    value: /^\d{14}$/,
                    message:
                      "El número de control debe tener un número 14 dígitos",
                  },
                })}
              />
              {errors.nc && <ValidationMessage message={errors.nc.message} />}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Contraseña
                </label>
                <p className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  ¿Olvidaste tu contraseña?
                </p>
              </div>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-slate-500"
                placeholder="••••••••"
                maxLength={8}
                {...register("password", {
                  required: "Ingrese su contraseña",
                  pattern: {
                    value: /^.{8}$/,
                    message: "La contraseña debe tener 8 caracteres",
                  },
                })}
              />
              {errors.password && (
                <ValidationMessage message={errors.password.message} />
              )}
            </div>

            <button
              type="submit"
              disabled={isloading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
            >
              Iniciar sesión
            </button>
            {serverError && <ValidationMessage message={serverError} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
