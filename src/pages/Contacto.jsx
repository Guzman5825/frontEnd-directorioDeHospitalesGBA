import perfil from "../assets/perfil.jpg"; // import desde assets

function Contacto() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contacto del desarrollador</h1>
      <p className="text-gray-700 mb-6">
        Puedes contactarnos a través del siguiente formulario o mediante los datos del desarrollador.
      </p>

      {/* Imagen del desarrollador */}
      <div className="flex justify-center mb-6">
        <img
          src={perfil}  
          alt="Foto del desarrollador"
          className="w-32 h-32 rounded-full border-2 border-green-700 object-cover"
        />
      </div>

      {/* Datos del desarrollador */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Desarrollador</h2>
        <p className="text-gray-800">Edilberto Guzmán</p>
      </div>

      {/* GitHub */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">GitHub</h2>
        <a
          href="https://github.com/Guzman5825"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://github.com/Guzman5825
        </a>
      </div>

      {/* Email */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Correo Electrónico</h2>
        <a
          href="mailto:guzmanedi5825@gmail.com"
          className="text-blue-600 hover:underline"
        >
          guzmanedi5825@gmail.com
        </a>
      </div>
    </div>
  )
}
export default Contacto