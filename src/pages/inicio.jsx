function Inicio() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center p-4">
                    {/* Logo */}
                    <div className="font-bold text-xl">MiLogo</div>

                    {/* Links */}
                    <ul className="flex gap-6">
                        <li className="hover:text-gray-200 cursor-pointer">Inicio</li>
                        <li className="hover:text-gray-200 cursor-pointer">Contacto</li>
                    </ul>
                </div>
            </nav>

            {/* Contenido principal */}
            <main className="min-h-screen w-full flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold">Bienvenido a mi página</h1>
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