import hospitales from "../datosPrueba/hospitales.json";
import HospitalRow from "../componentes/HospitalRow";
import ciudades from "../datosPrueba/ciudades.json";
import ListaDesplegable from "../componentes/ListaDesplegable";
import especialidades from "../datosPrueba/especialidades.json";

export default function HospitalTable() {
  return (

    <div className="p-6">
      <nav className="bg-green-700 text-white p-4 rounded-t-lg mb-6">
        <h1 className="text-2xl font-bold">Lista de Hospitales</h1>
      </nav>
      {/* Contenedor buscador */}
      <div className="bg-white rounded-md shadow-md flex items-center w-full gap-2 p-2">
        <ListaDesplegable titulo="Seleccione un hospital" items={hospitales} mostrar="nombre" />
        <ListaDesplegable titulo="Seleccione una especialidad" items={especialidades} mostrar="nombre" />
        <ListaDesplegable titulo="Seleccione una ciudad" items={ciudades} mostrar="nombre" />

        {/* Botón */}
        <button className="border bg-green-700 hover:bg-green-900 text-white rounded-md px-2 py-1">
          filtrar
        </button>
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