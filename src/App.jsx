import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import AssignRoles from './AssignRoles'
import AddMed from './AddMed'
import Supply from './Supply'
import Track from './Track'

function App() {
  return (
    <div className="App container py-3">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<AssignRoles />} />
          <Route path="/addmed" element={<AddMed />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
