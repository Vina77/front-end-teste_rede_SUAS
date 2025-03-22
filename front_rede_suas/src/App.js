import React from 'react';

const Header = () => (
  <header className="br-header mb-4" id="header" data-sticky="data-sticky">
    <div className="container-lg">
      <div className="header-top">
        <div className="header-logo">
          <img src="logo.png" alt="Logo"/>
          <span className="br-divider vertical"></span>
          <div className="header-sign">Assinatura</div>
        </div>
      </div>
    </div>
  </header>
);

const Main = () => (
  <main className="d-flex flex-fill mb-5" id="main">
    <div className="container-lg d-flex">
      <h1>Bem-vindo ao Template React!</h1>
    </div>
  </main>
);

const Footer = () => (
  <footer>
    <p>Rodapé do site</p>
  </footer>
);

const App = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
