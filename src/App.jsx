import { Route, Routes } from "react-router-dom"
import Inicio from './pages/inicio.jsx'
import Contacto from './pages/contacto.jsx'
import Hospitales from './pages/hospitales.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/hospitales' element={<Hospitales />} />
      </Routes>
    </div>
  )
}
export default App
