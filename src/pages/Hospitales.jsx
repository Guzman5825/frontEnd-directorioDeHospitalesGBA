import { useState } from "react";
import HospitalRow from "../componentes/HospitalRow";
import Selectores from "../componentes/Selectores";
import Buscador from "../componentes/Buscador";

export default function HospitalTable() {
  // Estado para los hospitales
  const [hospitales, setHospitales] = useState([]);

  const handleFiltrar = async ({ especialidad, ciudad, localidad }) => {
    console.log("Datos recibidos:", especialidad, ciudad, localidad);

    const baseUrl = `${import.meta.env.VITE_APP_API_URL}/hospitales`;

    // Armo los parámetros dinámicamente
    const params = new URLSearchParams();

    if (especialidad && especialidad !== "Todas las especialidades") {
      params.append("especialidad", especialidad);
    }
    if (ciudad && ciudad !== "Todas las ciudades") {
      params.append("ciudad", ciudad);
    }
    if (localidad && localidad !== "Todas las localidades") {
      params.append("localidad", localidad);
    }

    const url = params.toString() ? `${baseUrl}?${params}` : baseUrl;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("algo pasó en la consulta a la API");
      }
      const data = await response.json();

      // 👉 Guardo los datos en el estado
      setHospitales(data.data);
    } catch (error) {
      alert(`Error consultando la API:\n${error.message}`);
    }
  };

  const handleBuscar = (texto) => {
    alert(`Buscaste: ${texto}`);
    // podrías hacer algo parecido a handleFiltrar pero con ?nombre=texto
  };

  return (
    <div className="p-6">
      <nav className="bg-green-700 text-white p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Lista de Hospitales</h1>
      </nav>

      {/* Contenedor buscador */}
      <div className="max-w-xl">
        <div className="bg-white items-center p-2 mb-2">
          <h2 className="font-bold font-arial text-gray-800">
            Buscar por filtros
          </h2>
          <Selectores onFiltrar={handleFiltrar} />
        </div>
        <div className="bg-white items-center p-2 mb-2">
          <h2 className="font-bold font-arial text-gray-800">
            Buscar por nombre
          </h2>
          <Buscador onBuscar={handleBuscar} />
        </div>
      </div>

      <table className="w-full border border-gray-300 overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Ciudad</th>
            <th className="px-4 py-2 text-left">Localidad</th>
          </tr>
        </thead>
        <tbody>
          {hospitales.length > 0 ? (
            hospitales.map((hosp) => (
              <HospitalRow
                key={hosp.id}
                nombre={hosp.nombre}
                ubicacion={hosp.ubicacion}
                especialidades={hosp.especialidades}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center text-gray-500 p-4 italic"
              >
                no se encontraron hospitales
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
