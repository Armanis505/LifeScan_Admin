import { Link, useLocation } from "react-router-dom";
import { Users, UserPen , ClipboardList, Settings, LogOut } from "lucide-react";
import LifeScanTitle from "../../ui/LifeScanTitle";
import { useAuth } from "../../../contexts/AuthProvider";

const Sidebar = () => {
  const auth = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: "Tabla de Alumnos", path: "/students-table", icon: Users },
    { name: "Registrar Alumno", path: "/register-student", icon: UserPen },
    { name: "Historial de escaneos", path: "/history", icon: ClipboardList },
  ];

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("isLogin");
      auth.setIsAuthenticated(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-slate-300 border-r border-slate-800">
      <Link to="/homepage">
        <div className="p-6 flex items-center gap-3 hover:bg-slate-800 rounded-xl transition-colors">
          <LifeScanTitle size="text-2xl" />
        </div>
      </Link>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive ? "text-emerald-400" : "group-hover:text-blue-400"
                }
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link
          key={"Settings"}
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-400 hover:bg-blue-400/10 rounded-xl transition-colors"
        >
          <Settings size={20} />
          <span className="font-medium">Ajustes</span>
        </Link>

        <button
          type="submit"
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
