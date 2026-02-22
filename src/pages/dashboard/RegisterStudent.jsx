import { Link } from "react-router-dom";
import ButtonAccept from "../../components/ui/ButtonAccept";
import { useForm } from "react-hook-form";
import { useState } from "react";
import saveStundent from "../../services/saveStudent";
import ValidationMessage from "../../components/ui/ValidationMessage";
import { X } from "lucide-react";

const RegisterStudent = () => {
  const [serverError, setServerError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const [allergyItems, setAllergyItems] = useState([]);
  const [allergyInputValue, setAllergyInputValue] = useState("");

  const [conditionItems, setConditionItems] = useState([]);
  const [conditionInputValue, setConditionInputValue] = useState("");

  const addAllergy = () => {
    const cleanValue = allergyInputValue.trim();

    if (!cleanValue) {
      return;
    }
    if (allergyItems.includes(cleanValue)) {
      const message = <ValidationMessage message={"Este elemento ya existe"} />;
      return message;
    }

    setAllergyItems([...allergyItems, cleanValue]);
    setAllergyInputValue("");
  };

  const addCondition = () => {
    const cleanValue = conditionInputValue.trim();

    if (!cleanValue) {
      return;
    }
    if (conditionItems.includes(cleanValue)) {
      const message = <ValidationMessage message={"Este elemento ya existe"} />;
      return message;
    }

    setConditionItems([...conditionItems, cleanValue]);
    setConditionInputValue("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    setIsLoading(true);
    setServerError("");

    try {
      const finalData = {
        ...data,
        medicalConditions: conditionItems,
        allergies: allergyItems
      } 
      await saveStundent(finalData);
      location.reload();
    } catch (error) {
      setServerError(
        error.message ||
          "Error al registrar el estudiante, por favor intente de nuevo.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Registrar datos del alumno
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Agregar nuevo alumno al sistema, por favor completa la siguiente
            información.
          </p>
          {serverError && <ValidationMessage message={serverError} />}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label className="block text-sm/6 font-medium text-white">
                Nombre(s)
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="name"
                    type="text"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("name", {
                      required: "Ingrese el nombre del alumno",
                      pattern: {
                        value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s'-]+$/,
                        message:
                          "El nombre solo puede contener letras y espacios",
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <ValidationMessage message={errors.name.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-full">
              <label className="block text-sm/6 font-medium text-white">
                C.U.R.P.
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="curp"
                    type="text"
                    maxLength={18}
                    className="uppercase block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("curp", {
                      required: "Ingrese el CURP del alumno",
                      pattern: {
                        value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/,
                        message: "El CURP debe tener el formato correcto",
                      },
                    })}
                  />
                </div>
                {errors.curp && (
                  <ValidationMessage message={errors.curp.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-full">
              <label className="block text-sm/6 font-medium text-white">
                Número de Control
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="nc"
                    type="text"
                    maxLength={14}
                    className="uppercase block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("nc", {
                      required: "Ingrese el Número de control del alumno",
                      pattern: {
                        value: /^23303050\d{6}$/,
                        message:
                          "El Número de control debe de tener el formato correcto",
                      },
                    })}
                  />
                </div>
                {errors.nc && <ValidationMessage message={errors.nc.message} />}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Apellido Paterno
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="last-nameP"
                    type="text"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("lastNameP", {
                      required: "Ingrese el apellido paterno del alumno",
                      pattern: {
                        value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s'-]+$/,
                        message:
                          "El apellido paterno solo puede contener letras y espacios",
                      },
                    })}
                  />
                </div>
                {errors.lastNameP && (
                  <ValidationMessage message={errors.lastNameP.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Apellido Materno
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="last-nameM"
                    type="text"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("lastNameM", {
                      required: "Ingrese el apellido materno del alumno",
                      pattern: {
                        value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s'-]+$/,
                        message:
                          "El apellido materno solo puede contener letras y espacios",
                      },
                    })}
                  />
                </div>
                {errors.lastNameM && (
                  <ValidationMessage message={errors.lastNameM.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Fecha de Nacimiento
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    type="date"
                    id="birthdate"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("birthdate", {
                      required: "Ingrese la fecha de nacimiento del alumno",
                    })}
                  />
                </div>
                {errors.birthdate && (
                  <ValidationMessage message={errors.birthdate.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Correo institucional asignado
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="institutional-email"
                    type="email"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("institutionalEmail", {
                      required: "Ingrese el correo institucional del alumno",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:
                          "El correo institucional debe tener el formato correcto",
                      },
                    })}
                  />
                </div>
                {errors.institutionalEmail && (
                  <ValidationMessage
                    message={errors.institutionalEmail.message}
                  />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                N.S.S.
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="nss"
                    type="text"
                    maxLength={11}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("nss", {
                      required: "Ingrese el N.S.S. del alumno",
                      pattern: {
                        value: /^\d{11}$/,
                        message: "El N.S.S. debe tener 11 dígitos",
                      },
                    })}
                  />
                </div>
                {errors.nss && (
                  <ValidationMessage message={errors.nss.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Celular
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="cellphone"
                    type="tel"
                    maxLength={10}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("cel", {
                      required: "Ingrese el número de celular del alumno",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "El número de celular debe tener 10 dígitos",
                      },
                    })}
                  />
                </div>
                {errors.cel && (
                  <ValidationMessage message={errors.cel.message} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Datos Médicos
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Ingrese la información médica del estudiante.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label className="block text-sm/6 font-medium text-white">
                Tipo de Sangre
              </label>
              <div className="mt-2">
                <div className="grid grid-cols-1">
                  <select
                    id="bloodType"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    {...register("bloodType", {
                      required: "Seleccione el tipo de sangre del alumno",
                    })}
                  >
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"} defaultValue={true}>
                      O-
                    </option>
                  </select>
                </div>
                {errors.bloodType && (
                  <ValidationMessage message={errors.bloodType.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm/6 font-medium text-white">
                Peso (kg)
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="weight"
                    type="text"
                    maxLength={3}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("weight", {
                      required: "Ingrese el peso del alumno",
                      pattern: {
                        value: /^\d+$/,
                        message: "El peso debe ser un número válido",
                      },
                    })}
                  />
                </div>
                {errors.weight && (
                  <ValidationMessage message={errors.weight.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm/6 font-medium text-white">
                Estatura (cm)
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="height"
                    type="text"
                    maxLength={3}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("height", {
                      required: "Ingrese la talla del alumno",
                      pattern: {
                        value: /^\d+$/,
                        message: "La talla debe ser un número válido",
                      },
                    })}
                  />
                </div>
                {errors.height && (
                  <ValidationMessage message={errors.height.message} />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Condiciones Médicas
              </label>
              <div className="mt-2">
                <input
                  name="medicalConditions"
                  value={conditionInputValue}
                  onChange={(e) => setConditionInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCondition()}
                  className="block w-full mb-5 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <div className="flex flex-wrap gap-2">
                  {conditionItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between w-full mb-5 rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    >
                      {item}
                      <button
                        type="button"
                        className="hover:text-red-400 cursor-pointer"
                        onClick={() =>
                          setConditionItems(
                            conditionItems.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addCondition}
                  type="button"
                  className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Añadir Condición
                </button>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Alergias a Medicamentos
              </label>
              <div className="mt-2">
                <input
                  name="allergies"
                  value={allergyInputValue}
                  onChange={(e) => setAllergyInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addAllergy()}
                  className="block w-full mb-5 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <div className="flex flex-wrap gap-2">
                  {allergyItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between w-full mb-5 rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    >
                      {item}
                      <button
                        type="button"
                        className="hover:text-red-400 cursor-pointer"
                        onClick={() =>
                          setAllergyItems(
                            allergyItems.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addAllergy}
                  type="button"
                  className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Añadir Alergia
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Datos del padre, madre o tutor
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Ingrese la información del padre, madre o tutor del estudiante.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium text-white">
                Nombre Completo
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="nameP"
                    type="text"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("emergencyContact.name", {
                      required:
                        "Ingrese el nombre completo del padre, madre o tutor",
                      pattern: {
                        value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s'-]+$/,
                        message:
                          "El nombre completo solo puede contener letras y espacios",
                      },
                    })}
                  />
                </div>
                {errors.emergencyContact?.name && (
                  <ValidationMessage
                    message={errors.emergencyContact.name.message}
                  />
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm/6 font-medium text-white">
                Parentesco
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="relationship"
                    type="text"
                    maxLength={7}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("emergencyContact.relationship", {
                      required:
                        "Ingrese el parentesco del padre, madre o tutor",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "El parentesco solo puede contener letras y espacios",
                      },
                    })}
                  />
                </div>
                {errors.emergencyContact?.relationship && (
                  <ValidationMessage
                    message={errors.emergencyContact.relationship.message}
                  />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Teléfono de emergencia
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("emergencyContact.phone", {
                      required: "Ingrese el número de teléfono de emergencia",
                      pattern: {
                        value: /^\d{10}$/,
                        message:
                          "El número de teléfono de emergencia debe tener 10 dígitos",
                      },
                    })}
                  />
                </div>
                {errors.emergencyContact?.phone && (
                  <ValidationMessage
                    message={errors.emergencyContact.phone.message}
                  />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Segundo Teléfono de emergencia
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="phone2"
                    type="tel"
                    maxLength={10}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("emergencyContact.phone2", {
                      pattern: {
                        value: /^\d{10}$/,
                        message:
                          "El número de teléfono de emergencia debe tener 10 dígitos",
                      },
                    })}
                  />
                </div>
                {errors.emergencyContact?.phone2 && (
                  <ValidationMessage
                    message={errors.emergencyContact.phone2.message}
                  />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-white">
                Correo Personal
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="emailP"
                    type="email"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    {...register("emergencyContact.emailP", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:
                          "El correo personal debe tener el formato correcto",
                      },
                    })}
                  />
                </div>
                {errors.emergencyContact?.emailP && (
                  <ValidationMessage
                    message={errors.emergencyContact.emailP.message}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/">
          <button
            type="button"
            className="text-sm/6 font-semibold text-white hover:text-gray-400 font-sans transition-colors"
          >
            Cancelar
          </button>
        </Link>

        <ButtonAccept
          text={"Registrar Alumno"}
          type="submit"
          disabled={isloading}
        />
      </div>
    </form>
  );
};

export default RegisterStudent;
