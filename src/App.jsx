import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import Contacto from './pages/Contacto.jsx'
import Hospitales from './pages/Hospitales.jsx'
import HospitalDetalle from "./pages/HospitalDetalle.jsx"
import FormularioEstablecimiento from './pages/FormularioEstablecimiento.jsx'
import Administracion from './pages/Administracion.jsx'
import './index.css'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/hospitales' element={<Hospitales />} />
        <Route path='/formularioEstablecimiento' element={<FormularioEstablecimiento/>} />
        <Route path="/hospitales/:nombre" element={<HospitalDetalle />} />
        <Route path='/administracion' element={<Administracion/>} />
      </Routes>
    </div>
  )
}
export default App
