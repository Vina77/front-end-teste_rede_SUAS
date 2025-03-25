import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaginaRegistro = () => {
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Configuração base do Axios
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8000/api';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const verificarIdade = (dataNasc) => {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade >= 18;
  };

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (!email) {
      alert('O campo E-mail está vazio');
      return;
    }

    if (!validarEmail(email)) {
      alert('Formato de e-mail inválido');
      return;
    }
    
    if (!dataNascimento) {
      alert('O campo Data de Nascimento está vazio');
      return;
    }
    
    if (!senha) {
      alert('O campo Senha está vazio');
      return;
    }

    if (senha.length < 5) {
      alert('A senha deve ter no mínimo 5 caracteres');
      return;
    }

    // Verificar se a pessoa é maior de 18 anos
    if (!verificarIdade(dataNascimento)) {
      alert('Você deve ter pelo menos 18 anos para se registrar');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/registrar', {
        email,
        dt_nascimento: dataNascimento,
        senha
      });

      alert(response.data.message);
      
      // Redirecionar para página de acesso
      navigate('/acesso');
    } catch (error) {
      if (error.response) {
        // Erro retornado pelo servidor
        alert(error.response.data.error || 'Erro no registro');
      } else if (error.request) {
        // Erro de conexão
        alert('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        // Erro ao configurar a requisição
        alert('Erro ao processar o registro');
      }
      console.error('Erro detalhado:', error);
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
    overflow: 'auto',
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
                <h4 className="mb-4">Registro no Sistema</h4>
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
                    <div className="br-input">
                      <label htmlFor="dataNascimento">Data de Nascimento</label>
                      <input 
                        type="date" 
                        id="dataNascimento" 
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
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
                    {loading ? 'Registrando...' : 'Registrar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaRegistro;