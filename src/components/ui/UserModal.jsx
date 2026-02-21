import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { UserCircle, X } from "lucide-react";

const UserModal = ({ nc, name, institution, role }) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <UserCircle
          size={30}
          className="text-slate-400 hover:text-slate-200 cursor-pointer"
        />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-end mb-10 p-8">
          <DialogPanel className="max-w-lg space-y-4 border bg-slate-700 text-slate-200 p-5 rounded-2xl">
            <div className="flex justify-end">
              <X
                text="Cerrar"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-slate-400"
              />
            </div>
            <div className="flex justify-center mb-10">
              <UserCircle size={50} className="text-slate-400" />
            </div>
            <Description>
              <strong>Número de Control: </strong>
              {nc}
            </Description>
            <Description>
              <strong>Nombre: </strong>
              {name}
            </Description>
            <Description>
              <strong>Institución: </strong>
              {institution}
            </Description>
            <Description>
              <strong>Rol: </strong>
              {role}
            </Description>
            <p>Tingarrerra.</p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default UserModal;
