import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PaginaPrincipal = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Configuração base do Axios
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8000/api';
  }, []);

  // Buscar usuários
  const buscarUsuarios = useCallback(async () => {
    if (localStorage.getItem('usuarioLogado') !== 'true') {
      navigate('/principal');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/listagem-usuarios');
      setUsuarios(response.data);
    } catch (err) {
      setError('Erro ao buscar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleAcesso = useCallback(() => {
    navigate("/acesso");
  }, [navigate]);

  const handleRegistro = useCallback(() => {
    navigate("/registro");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("usuarioLogado");
    
    sessionStorage.setItem("mostrarMensagemLogout", "true");

    window.location.reload();
  }, []);

  useEffect(() => {
    buscarUsuarios();

    if (sessionStorage.getItem("mostrarMensagemLogout") === "true") {
      sessionStorage.removeItem("mostrarMensagemLogout");
      alert("Desconectado com sucesso!");
    }
    
    if (!window.location.pathname.includes("/acesso")) {
      const isFirstLoad = sessionStorage.getItem("appStarted") !== "true";
      
      if (isFirstLoad) {
        localStorage.removeItem("usuarioLogado");
        sessionStorage.setItem("appStarted", "true");
      }
    }

    const botaoTelaAcesso = document.getElementById("botaoTelaAcesso");
    const botaoTelaRegistro = document.getElementById("botaoTelaRegistro");
    const botaoSair = document.getElementById("botaoSair");
    const botaoEntrar = document.getElementById("botaoEntrar");
    const textoBotao = document.getElementById("textoBotao");

    if (botaoTelaAcesso) {
      botaoTelaAcesso.addEventListener("click", handleAcesso);
    }

    if (botaoTelaRegistro) {
      botaoTelaRegistro.addEventListener("click", handleRegistro);
    }

    if (botaoSair) {
      if (localStorage.getItem("usuarioLogado") === "true") {
        botaoSair.style.display = "block";
      } else {
        botaoSair.style.display = "none";
      }
      
      botaoSair.removeEventListener("click", handleAcesso);
      botaoSair.addEventListener("click", handleLogout);
    }

    if (botaoEntrar && textoBotao) {
      botaoEntrar.disabled = false;
      textoBotao.textContent = "Entrar";
      
      if (localStorage.getItem("usuarioLogado") === "true") {
        botaoEntrar.disabled = true;
        textoBotao.textContent = "Conectado";
      }

      botaoEntrar.addEventListener("click", handleAcesso);
    }

    const listaUsuariosElement = document.getElementById("listaUsuarios");
    if (listaUsuariosElement) {
      listaUsuariosElement.innerHTML = usuarios.length > 0 
        ? usuarios.map(usuario => `
          <tr>
            <td>${usuario.email}</td>
            <td>${usuario.dt_nascimento}</td>
          </tr>
        `).join('')
        : '<tr><td colspan="2">Conecte para exibir o painel!</td></tr>';
    }

    return () => {
      if (botaoTelaAcesso) {
        botaoTelaAcesso.removeEventListener("click", handleAcesso);
      }

      if (botaoTelaRegistro) {
        botaoTelaRegistro.removeEventListener("click", handleRegistro);
      }

      if (botaoSair) {
        botaoSair.removeEventListener("click", handleLogout);
      }

      if (botaoEntrar) {
        botaoEntrar.removeEventListener("click", handleAcesso);
      }
    };
  }, [
    handleAcesso, 
    handleRegistro, 
    handleLogout, 
    buscarUsuarios, 
    usuarios
  ]);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default PaginaPrincipal;