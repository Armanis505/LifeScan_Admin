import { useEffect, useState } from "react";
import Students from "../../services/students";
import ValidationMessage from "../../components/ui/ValidationMessage";

const StudentsTable = () => {

    const [table, setTable] = useState([]);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        LoadTable();
    }, []);

    const LoadTable = async () =>{
        try{
            const data = await Students();
            setTable(data);
        }
        catch(error){
            setServerError(error.message);
        }
    };

    return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700">
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                Número de Control
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                Nombre(s)
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                Apellido Paterno
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                Correo Institucional
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {serverError && <ValidationMessage message={serverError}/>}
            {table.map((student) => (
              <tr
                key={student.nc}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                  {student.nc}
                </td>
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {student.lastNameP}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {student.institutionalEmail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
