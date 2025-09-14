import { useParams } from "react-router-dom";
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
          setHospital(data[0]); // Tomamos el primero
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
    <div className="p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold">{hospital.nombre}</h1>
      <p className="text-gray-700 mt-1">Tipo: {hospital.tipo}</p>

      <h2 className="mt-4 font-semibold">Ubicación:</h2>
      <p>Ciudad: {hospital.ubicacion.ciudad}</p>
      <p>Localidad: {hospital.ubicacion.localidad}</p>
      <p>Dirección: {hospital.ubicacion.direccion}</p>

      <h2 className="mt-4 font-semibold">Teléfonos:</h2>
      <ul>
        {hospital.telefonos.map((tel, index) => (
          <li key={index}>{tel}</li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">Especialidades:</h2>
      <ul>
        {hospital.especialidades.map((esp, index) => (
          <li key={index}>{esp}</li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">Días y Horarios:</h2>
      <p>{hospital.dias_y_horarios}</p>
    </div>
  );
}
