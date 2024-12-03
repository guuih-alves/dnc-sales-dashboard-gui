import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home, Leads, Profile, Login, Registration } from "./pages"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/cadastro" element={<Registration />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/leads" element={<Leads />}></Route>
        <Route path="/perfil" element={<Profile />}></Route>
      </Routes>
    </Router>
  )
}

export default App
