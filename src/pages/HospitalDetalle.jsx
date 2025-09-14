import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HospitalDetalle() {
  const { nombre } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      const baseUrl = `${import.meta.env.VITE_APP_API_URL}/hospitales`;
      try {
        const response = await fetch(`${baseUrl}/${nombre}`);
        if (!response.ok) {
          throw new Error("Error al obtener hospital");
        }
        const data = await response.json();
        if (data.length > 0) {
          setHospital(data[0]);
        } else {
          setError("Hospital no encontrado");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [nombre]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Cargando...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!hospital) {
    return <div className="p-6 text-center text-red-500">Hospital no encontrado</div>;
  }

  return (
    <div>
      <nav className="bg-gray-100 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-xl">INFORMACION</div>
          <ul className="flex gap-6">
            <li className="cursor-pointer">
              <Link to="/" className="cursor-pointer">
                Inicio
              </Link>
              
            </li>
            <li className="cursor-pointer">
              <Link to="/hospitales" className="cursor-pointer">
                Volver a busqueda
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
          {hospital.nombre}
        </h1>

        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Tipo:</span> {hospital.tipo}
        </p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Ubicación</h2>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
            <p><span className="font-medium">Ciudad:</span> {hospital.ubicacion.ciudad}</p>
            <p><span className="font-medium">Localidad:</span> {hospital.ubicacion.localidad}</p>
            <p><span className="font-medium">Dirección:</span> {hospital.ubicacion.direccion}</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Teléfonos</h2>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md border border-gray-100">
            {hospital.telefonos.map((tel, index) => (
              <li key={index}>{tel}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Especialidades</h2>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md border border-gray-100">
            {hospital.especialidades.map((esp, index) => (
              <li key={index}>{esp}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Días y Horarios</h2>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
            {hospital.dias_y_horarios}
          </div>
        </div>
      </div>
    </div>
  );
}
