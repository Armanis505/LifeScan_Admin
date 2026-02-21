import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { BellIcon, X, CircleAlertIcon } from "lucide-react";

const NotificationModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <BellIcon
          size={30}
          className="text-slate-400 hover:text-slate-200 cursor-pointer"
        />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-end mb-70 p-8">
          <DialogPanel className="w-96 space-y-4 border bg-slate-700 text-slate-200 p-3 rounded-2xl">
            <div className="flex justify-between">
              <DialogTitle className="text-slate-200">
                Notificaciones
              </DialogTitle>
              <X
                text="Cerrar"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-slate-400"
              />
            </div>
            <div className="border-b border-slate-300"></div>
            <Description>
              <strong>Notificación 1 </strong>
            </Description>
            <Description>
              <strong>Notificación 2 </strong>
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default NotificationModal;
