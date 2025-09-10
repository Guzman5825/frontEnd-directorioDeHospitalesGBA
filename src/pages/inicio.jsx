import { Link } from "react-router-dom";

function Inicio() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-gray-800 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center p-4">
                    {/* Logo */}
                    <div className="font-bold text-xl">MiLogo</div>

                    {/* Links */}
                    <ul className="flex gap-6">
                        <li className="hover:text-gray-200 cursor-pointer">Inicio</li>
                        <li className="hover:text-gray-200 cursor-pointer">
                            <Link to="/contacto" className="hover:text-gray-200 cursor-pointer">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Contenido principal */}
            <main className="min-h-screen w-full flex flex-col bg-gradient-to-r from-white-100 via-green-10 to-green-50">
                <div className="mx-20">
                    {/* Sección Quienes Somos */}
                    <section className="flex flex-col items-left justify-center text-left py-16 px-20">
                        <h2 className="text-4xl font-bold mb-4">Quiénes Somos</h2>
                        <p className="text-lg text-gray-700 max-w-2xl">
                            Somos una plataforma dedicada a conectar a pacientes con hospitales y centros de salud en el Gran Buenos Aires.
                            Nuestro objetivo es facilitar el acceso a la información sobre servicios de salud y mejorar la experiencia del paciente.
                        </p>
                    </section>

                    {/* Sección Estilo Oracle Cloud */}
                    <section className="flex flex-col md:flex-row w-full py-16 px-8 gap-8 justify-center">

                        {/* Tarjeta 1 */}
                        <div className="flex-1 bg-green-700 text-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Consultas</h3>
                            <p className="mb-6">
                                En esta seccion podras realizar consultas sobre los hospitales
                                y sus especialidades.
                            </p>
                            <Link
                                to="/hospitales"
                                className="bg-white text-green-700 px-4 py-2 rounded shadow hover:bg-gray-100 cursor-pointer"
                            >
                                Ir a consultas
                            </Link>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="flex-1 bg-blue-800 text-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Ingresar centros de salud</h3>
                            <p className="mb-6">
                                En esta seccion podras ingresar nuevos centros de salud al sistema.
                                Si eres un profesional de profesional de la salud, puedes registrar tu
                                establecimiento para que más personas puedan encontrarlo.
                            </p>
                            <Link
                                to="/formularioEstablecimiento"
                                className="bg-white text-blue-700 px-4 py-2 rounded shadow hover:bg-gray-100 cursor-pointer"
                            >
                                Ir a Establecimientos
                            </Link>
                        </div>
                    </section>
                </div>
            </main>


            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto p-4 text-center">
                    &copy; 2024 MiSitioWeb. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    )
}

export default Inicio