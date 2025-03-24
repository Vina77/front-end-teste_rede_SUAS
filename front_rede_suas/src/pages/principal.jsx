import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PaginaPrincipal = () => {
  const navigate = useNavigate();

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
  }, [handleAcesso, handleRegistro, handleLogout]);

  return null;
};

export default PaginaPrincipal;