import { useState, useEffect } from "react";

export default function HospitalesTabla() {
  const [hospitales, setHospitales] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Traer hospitales
  const fetchHospitales = async (pagina = 1) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/hospitales?page=${pagina}&page_size=${pageSize}`
      );
      const result = await res.json();
      setHospitales(result.data);
      setPage(result.page);
      setTotalPages(result.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHospitales();
  }, []);

  // Eliminar hospital por nombre
  const eliminarHospital = async (nombre) => {
    if (!window.confirm(`¿Seguro que quieres eliminar '${nombre}'?`)) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/hospitales/${encodeURIComponent(nombre)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert(`Hospital '${nombre}' eliminado correctamente`);
        fetchHospitales(page); // refresca la tabla
      } else {
        alert(`No se pudo eliminar el hospital '${nombre}'`);
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el hospital");
    }
  };

  return (
    <div className="p-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Ciudad</th>
            <th className="py-2 px-4 border-b">Localidad</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hospitales.map((hospital) => (
            <tr key={hospital.id} className="text-center">
              <td className="py-2 px-4 border-b">{hospital.nombre}</td>
              <td className="py-2 px-4 border-b">{hospital.ubicacion.ciudad}</td>
              <td className="py-2 px-4 border-b">{hospital.ubicacion.localidad}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => eliminarHospital(hospital.nombre)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {hospitales.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4">
                No hay hospitales para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => fetchHospitales(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => fetchHospitales(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
