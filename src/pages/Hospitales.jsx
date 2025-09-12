import hospitales from '../datosPrueba/hospitales.json';
import HospitalRow from '../componentes/HospitalRow';
import Selectores from '../componentes/Selectores';
import Buscador from '../componentes/Buscador';

export default function HospitalTable() {
  const handleFiltrar = ({ especialidad, ciudad, localidad }) => {
    // Aquí ya recibes los datos del hijo
    console.log("Datos recibidos:", especialidad, ciudad, localidad);
    alert(`Voy a filtrar con:\nespecialidad: ${especialidad} \nCiudad: ${ciudad}\nLocalidad: ${localidad}`);
  };

  const handleBuscar = (texto) => {
    alert(`Buscaste: ${texto}`); // aquí puedes usar el valor
  };

  return (
    <div className="p-6">
      <div className="max-w-xl bg-gray-100">

      </div>

      <nav className="bg-green-700 text-white p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Lista de Hospitales</h1>
      </nav>
      {/* Contenedor buscador */}

      <div className='max-w-xl'>
        <div className="bg-white items-center  p-2 mb-2">
          <h2 className="font-bold font-arial text-gray-800">Buscar por filtros</h2>
          <Selectores onFiltrar={handleFiltrar} />
        </div>
        <div className="bg-white items-center  p-2 mb-2">
          <h2 className="font-bold font-arial text-gray-800">Buscar por nombre</h2>
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
          {hospitales.map((hosp) => (
            <HospitalRow
              key={hosp.id}
              nombre={hosp.nombre}
              ubicacion={hosp.ubicacion}
              especialidades={hosp.especialidades}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}