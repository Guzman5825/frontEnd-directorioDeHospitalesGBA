import { useState } from "react";
import { Link } from "react-router-dom";

export default function HospitalRow({ nombre, ubicacion, especialidades }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fila principal */}
      <tr
        className="cursor-pointer hover:bg-gray-100 transition"
        onClick={() => setOpen(!open)}
      >
        <td className="px-4 py-2 font-semibold flex items-center gap-2">
          {nombre}
          <span className="text-gray-500 text-sm">{open ? "▲" : "▼"}</span>
        </td>
        <td className="px-4 py-2">{ubicacion.ciudad}</td>
        <td className="px-4 py-2">{ubicacion.localidad}</td>
      </tr>

      {/* Fila expandida */}
      {open && (
        <tr>
          <td colSpan={3} className="bg-gray-50 px-4 py-3">
            <p className="font-medium mb-2">Especialidades:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {
              especialidades.map((esp, index) => (
                <li key={index}>{esp}</li>
              ))
              
              }
            </ul>
            <Link
              to={`/hospitales/${nombre}`}
              className="inline-block mt-3 px-4 py-2 bg-gray-600 text-white rounded hover:bg-green-700 transition"
            >
              Ver detalles
            </Link>
          </td>
        </tr>
      )}
    </>
  );
}
