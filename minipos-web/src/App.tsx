import './App.css'
import CustomersPage from './pages/CustomersPage';
import DepartamentsPage from './pages/DepartamentsPage';
import PancocoPage from './pages/PancocoPage';
import MainLayout from './layouts/MainLayout';
import SidebarMenu from './components/SidebarMenu';
import { useState } from 'react';
import AboutPage from './pages/About';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState("dashboard");

  function renderContent() {
    switch (page) {
      case "dashboard":
        return <DashboardPage />;
      case "customers":
        return <CustomersPage />;
      case "departments":
        return <DepartamentsPage />;
      case "pancoco":
        return <PancocoPage />;
      case "about":
        return <AboutPage />;
      default:
        return <DashboardPage />;
    }
  }

  const sidebar = (
    <div>
      <SidebarMenu current={page} onChange={setPage} />
      <div className="mt-6 border-t pt-4">
        <p className="text-xs text-gray-500 mb-2">Hola, {user?.username}</p>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
  return (
    <PrivateRoute fallback={<LoginPage onSuccess={() => { }} />}>
      <MainLayout sidebar={sidebar} content={renderContent()} />
    </PrivateRoute>
  );




{/*
    <div className="w-screen h-screen bg-slate-900">

      
      <h1 className="text-4xl font-bold text-sky-400 drop-shadow-lg text-center">
        ¡Tailwind funcionando!
      </h1>

      <PanCoco name="PEPITO" />

      <Profile
        name="Camilo Garcia"
        semester="Noveno"
        program="Ingenieria de Sistemas"
      />
    
      <CustomersPage />
      <DepartamentsPage />
      <PancocoPage />

    </div>
  )*/}
}

export default App
