import { useState } from "react";

export default function FormularioHospital() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [especialidades, setEspecialidades] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefonos, setTelefonos] = useState("");
  const [diasYHorarios, setDiasYHorarios] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hospital = {
      nombre,
      tipo,
      especialidades: especialidades.split(",").map((e) => e.trim()),
      ubicacion: { ciudad, localidad, direccion },
      telefonos: telefonos.split(",").map((t) => t.trim()),
      dias_y_horarios: diasYHorarios,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/hospitales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hospital),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el hospital");
      }

      const data = await response.json();
      alert("Hospital agregado correctamente: " + data.hospital.nombre);

      // Limpiar formulario
      setNombre("");
      setTipo("");
      setEspecialidades("");
      setCiudad("");
      setLocalidad("");
      setDireccion("");
      setTelefonos("");
      setDiasYHorarios("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md space-y-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Especialidades (separadas por coma)"
        value={especialidades}
        onChange={(e) => setEspecialidades(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Localidad"
        value={localidad}
        onChange={(e) => setLocalidad(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Teléfonos (separados por coma)"
        value={telefonos}
        onChange={(e) => setTelefonos(e.target.value)}
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
  );
}
