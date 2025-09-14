import { useState } from "react";
import tipos from "../datosPrueba/tipos.json";
import ciudades from "../datosPrueba/ciudades.json";
import especialidadesData from "../datosPrueba/especialidades.json";
import { Link } from "react-router-dom";
export default function FormularioHospital() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [especialidades, setEspecialidades] = useState([]); // lista final
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState(""); // teléfono individual
  const [telefonos, setTelefonos] = useState([]); // lista de teléfonos
  const [diasYHorarios, setDiasYHorarios] = useState("");

  // Localidades dinámicas según ciudad seleccionada
  const localidadesDisponibles =
    ciudades.find((c) => c.nombre === ciudad)?.localidades || [];

  const agregarEspecialidad = () => {
    if (
      especialidadSeleccionada &&
      !especialidades.includes(especialidadSeleccionada)
    ) {
      setEspecialidades([...especialidades, especialidadSeleccionada]);
      setEspecialidadSeleccionada("");
    }
  };

  const quitarEspecialidad = (esp) => {
    setEspecialidades(especialidades.filter((e) => e !== esp));
  };

  const agregarTelefono = () => {
    if (telefono && !telefonos.includes(telefono)) {
      setTelefonos([...telefonos, telefono]);
      setTelefono("");
    }
  };

  const quitarTelefono = (tel) => {
    setTelefonos(telefonos.filter((t) => t !== tel));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !nombre.trim() ||
      !tipo ||
      especialidades.length === 0 ||
      !ciudad ||
      !localidad ||
      !direccion.trim() ||
      telefonos.length === 0 ||
      !diasYHorarios.trim()
    ) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    const hospital = {
      nombre,
      tipo,
      especialidades, // array de nombres
      ubicacion: { ciudad, localidad, direccion },
      telefonos, // ahora es un array
      dias_y_horarios: diasYHorarios,
    };

    const baseUrl = `${import.meta.env.VITE_APP_API_URL}/hospitales`;

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hospital),
      });

      if (!response.ok) {
        // Intentar leer el mensaje del backend
        const errorData = await response.json().catch(() => null);

        if (errorData && errorData.detail) {
          throw new Error(errorData.detail); // FastAPI suele devolver en "detail"
        } else {
          throw new Error("Error en la petición: " + response.status);
        }
      }

      const data = await response.json();
      alert("Hospital agregado correctamente: " + data.hospital.nombre);

      // Limpiar formulario
      setNombre("");
      setTipo("");
      setEspecialidades([]);
      setEspecialidadSeleccionada("");
      setCiudad("");
      setLocalidad("");
      setDireccion("");
      setTelefonos([]);
      setTelefono("");
      setDiasYHorarios("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-xl">Ingresos de nuevos centros medicos</div>
          <ul className="flex gap-6">
            <li className="hover:text-gray-200 cursor-pointer">
              <Link to="/" className="hover:text-gray-200 cursor-pointer">
                Inicio
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md space-y-4"
      >
        <input
          className="border p-2 rounded w-full"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* Selector de tipo */}
        <select
          className="border p-2 rounded w-full"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Selecciona un tipo</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.tipo}>
              {t.tipo}
            </option>
          ))}
        </select>

        {/* Sección especialidades */}
        <div>
          <div className="flex gap-2">
            <select
              className="border p-2 rounded flex-grow"
              value={especialidadSeleccionada}
              onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
            >
              <option value="">Selecciona una especialidad</option>
              {especialidadesData.map((esp) => (
                <option key={esp.id} value={esp.nombre}>
                  {esp.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={agregarEspecialidad}
              className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
            >
              Agregar
            </button>
          </div>

          {/* Lista de especialidades seleccionadas */}
          <div className="flex flex-wrap gap-2 mt-2">
            {especialidades.map((esp, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {esp}
                <button
                  type="button"
                  onClick={() => quitarEspecialidad(esp)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Sección teléfonos */}
        <div>
          <div className="flex gap-2">
            <input
              className="border p-2 rounded flex-grow"
              placeholder="Agregar teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <button
              type="button"
              onClick={agregarTelefono}
              className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {telefonos.map((tel, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tel}
                <button
                  type="button"
                  onClick={() => quitarTelefono(tel)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Selector de ciudad */}
        <select
          className="border p-2 rounded w-full"
          value={ciudad}
          onChange={(e) => {
            setCiudad(e.target.value);
            setLocalidad("");
          }}
        >
          <option value="">Selecciona una ciudad</option>
          {ciudades.map((c) => (
            <option key={c.id} value={c.nombre}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* Selector de localidad */}
        <select
          className="border p-2 rounded w-full"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          disabled={!ciudad}
        >
          <option value="">Selecciona una localidad</option>
          {localidadesDisponibles.map((l, i) => (
            <option key={i} value={l}>
              {l}
            </option>
          ))}
        </select>

        <input
          className="border p-2 rounded w-full"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Días y horarios"
          value={diasYHorarios}
          onChange={(e) => setDiasYHorarios(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Agregar Hospital
        </button>
      </form>
    </div>
  );
}
