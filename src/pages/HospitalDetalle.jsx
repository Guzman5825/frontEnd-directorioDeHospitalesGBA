import { useParams } from 'react-router-dom';
import hospitales from '../datosPrueba/hospitales.json';

export default function HospitalDetalle() {
  const { nombre } = useParams();

  // Buscar hospital por nombre (React Router decodifica %20 automáticamente)
  const hospital = hospitales.find((h) => h.nombre === nombre);

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
