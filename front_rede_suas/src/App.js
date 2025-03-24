import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PaginaAcesso from './pages/acesso';
import PaginaPrincipal from './pages/principal';
import PaginaRegistro from './pages/registro';

const App = () => {
  return (
    <Routes>
      {/* Redireciona a rota raiz para /acesso */}
      <Route path="/" element={<Navigate to="/principal" />} />
      
      {/* Define a rota /acesso */}
      <Route path="/acesso" element={<PaginaAcesso />} />
      
      {/* Define a rota /registro */}
      <Route path="/registro" element={<PaginaRegistro />} />
      
      {/* Define a rota /principal */}
      <Route path="/principal" element={<PaginaPrincipal />} />
    </Routes>
  );
};

export default App;