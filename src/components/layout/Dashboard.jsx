import Sidebar from "./dashboard/Sidebar";
import Navbar from "./dashboard/Navbar";
import NotificationModal from "../ui/NotificationModal";
import UserModal from "../ui/UserModal"; 

const Dashboard = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-800">
          <Navbar bgColor={"bg-slate-900"} object1={<NotificationModal />} object2={<UserModal nc="23303050620216" name="Giorgio Armani Official" institution="Centro Bachillerato Tecnológico Industrial y de Servicios No.62" role="Capturador"/>} />
          <div className="flex-1 overflow-y-auto">
            <div className="p-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    );
};

export default Dashboard;