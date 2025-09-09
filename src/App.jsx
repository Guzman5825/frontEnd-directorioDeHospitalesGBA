import { Route, Routes } from "react-router-dom"
import Inicio from './pages/inicio.jsx'
import Contacto from './pages/contacto.jsx'
import Hospitales from './pages/hospitales.jsx'
import './index.css'


function App() {
  return (
    <div>

      <div> 
        <h1 className="text-3xl font-bold underline text-center p-4 bg-blue-200 text-blue-900">
          Directorio de Hospitales del Gran Buenos Aires</h1>
      </div>

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/hospitales' element={<Hospitales />} />
      </Routes>
    </div>
  )
}
export default App
