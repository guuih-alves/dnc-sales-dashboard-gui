import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"
import { Home, Leads, Profile, Login, Registration } from "./pages"

function App() {
  const ProtectedRoute = () =>{
    const checkAuthCookie = Cookies.get('Authorization')
    if (!checkAuthCookie) {
      alert('Autenticacao necessaria')
      return <Navigate to='/' replace />
    }
                                            
    return <Outlet />
                                     //O Outlet é um componente do React Router que é usado para renderizar componentes filhos em rotas aninhadas. 
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/cadastro" element={<Registration />}></Route>
        <Route element={<ProtectedRoute/> }>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/leads" element={<Leads />}></Route>
          <Route path="/perfil" element={<Profile />}></Route>
        
        </Route>
     
      </Routes>
    </Router>
  )
}

export default App
