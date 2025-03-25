import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaginaAcesso = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Configuração base do Axios
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8000/api';
    localStorage.removeItem('usuarioLogado');
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (email === '' || senha === '') {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/acessar', {
        email: email,
        senha: senha
      });

      localStorage.setItem('usuarioLogado', 'true');
      localStorage.setItem('userEmail', email);
      
      // Mensagem de sucesso
      alert(response.data.message);
      
      // Navegar para página principal
      navigate('/principal');

    } catch (error) {
      // Tratamento de erro
      if (error.response) {
        alert(error.response.data.error || 'Erro no login');
      } else {
        alert('Erro ao processar o login');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const fullScreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 9999,
    overflow: 'hidden', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const logoStyle = {
    width: '300px',
    display: 'block',
    margin: '0 auto 20px'
  };

  return (
    <div style={fullScreenStyle}>
      <div className="container-lg">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <img 
                  src="/assets/MDS.png" 
                  alt="Logo MDS" 
                  style={logoStyle}
                />
                <h4 className="mb-4">Acesso ao Sistema</h4>
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="mb-3">
                    <div className="br-input">
                      <label htmlFor="email">E-mail</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="br-input input-button">
                      <label htmlFor="senha">Senha</label>
                      <input 
                        type={mostrarSenha ? "text" : "password"}
                        id="senha" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                      />
                      <button 
                        className="br-button" 
                        type="button" 
                        aria-label="Exibir senha" 
                        role="switch" 
                        aria-checked={mostrarSenha}
                        onClick={toggleMostrarSenha}
                      >
                        <i className={`fas fa-${mostrarSenha ? 'eye-slash' : 'eye'}`} aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="br-button primary" 
                    disabled={loading}
                  >
                    {loading ? 'Carregando...' : 'Acessar'}
                  </button>
                  <div className="mt-3 text-center">
                    <p>Não tem uma conta? <a href="/registro">Registre-se aqui</a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaAcesso;