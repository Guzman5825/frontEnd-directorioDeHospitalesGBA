import { useState, useEffect } from "react";
import HospitalRow from "../componentes/HospitalRow";
import Selectores from "../componentes/Selectores";
import { Link } from 'react-router-dom';

export default function HospitalTable() {
  const [hospitales, setHospitales] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFiltrar = async ({ especialidad, ciudad, localidad, nombre }, pageParam = 1) => {
    const baseUrl = `${import.meta.env.VITE_APP_API_URL}/hospitales`;

    const params = new URLSearchParams();
    params.append("page", pageParam); // 👈 envío la página actual
    params.append("page_size", 10);   // 👈 puedes ajustarlo o hacerlo dinámico

    if (especialidad && especialidad !== "Todas las especialidades")
      params.append("especialidad", especialidad);

    if (ciudad && ciudad !== "Todas las ciudades")
      params.append("ciudad", ciudad);

    if (localidad && localidad !== "Todas las localidades")
      params.append("localidad", localidad);

    if (nombre)
      params.append("nombre", nombre);

    const url = `${baseUrl}?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("algo pasó en la consulta a la API");
      }
      const data = await response.json();

      setHospitales(data.data);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      alert(`Error consultando la API:\n${error.message}`);
    }
  };

  // Cuando cambie la página, refetch
  useEffect(() => {
    handleFiltrar({}, page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="">
      <nav className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-xl">Registro de centros Medicos</div>
          <ul className="flex gap-6">
            <li className="hover:text-gray-200 cursor-pointer">
              <Link to="/" className="hover:text-gray-200 cursor-pointer">
                Inicio
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="p-6">
        {/* Contenedor buscador */}
        <div className="max-w-xl">
          <div className="bg-white items-center p-2 mb-2">
            <h2 className="font-bold font-arial text-gray-800">
              Buscar por filtros
            </h2>
            <Selectores onFiltrar={(filtros) => handleFiltrar(filtros, 1)} />
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

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            ←
          </button>

          {/* Mostrar páginas alrededor */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === totalPages ||
                (p >= page - 2 && p <= page + 2)
            )
            .map((p, i, arr) => (
              <span key={p}>
                {/* Puntos suspensivos */}
                {i > 0 && arr[i - 1] !== p - 1 && <span className="px-2">...</span>}
                <button
                  className={`px-3 py-1 border rounded ${p === page ? "bg-green-700 text-white" : ""
                    }`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </button>
              </span>
            ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}