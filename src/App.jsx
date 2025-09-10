import { Route, Routes } from "react-router-dom"
import Inicio from './pages/inicio.jsx'
import Contacto from './pages/contacto.jsx'
import Hospitales from './pages/hospitales.jsx'
import HospitalDetalle from "./pages/hospitalDetalle.jsx"
import './index.css'
import FormularioEstablecimiento from "./pages/formularioEstablecimiento.jsx"


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/hospitales' element={<Hospitales />} />
        <Route path='/formularioEstablecimiento' element={<FormularioEstablecimiento/>} />
        <Route path="/hospitales/:nombre" element={<HospitalDetalle />} />
      </Routes>
    </div>
  )
}
export default App
