import './App.css'
import AjusteStock from './components/AjusteStock'
import Principal from './components/Principal'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/ajuste' element={<AjusteStock />} /> {/* Cambiado aquí */}
        </Routes>
      </Router>
    </div>
  );
}
export default App