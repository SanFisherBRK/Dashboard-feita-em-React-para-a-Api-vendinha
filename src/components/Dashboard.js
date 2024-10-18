import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import Breadcrumb from "./Breadcrumb";

function Dashboard() {
  return (
    <div>
      <h1>Bem-vindo a Api-Vendinha</h1>
      
      <p>Esta é a página inicial do seu painel.</p>

      <div className="container">
  <div className="row">
    <div className="col-md-4">
      <div className="card text-bg-primary mb-3" style={{ width: '18rem' }}>
        <div className="card-header">Usuários</div>
        <div className="card-body">
          <h5 className="card-title">Usuários Cadastrados</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card text-bg-secondary mb-3" style={{ width: '18rem' }}>
        <div className="card-header">Produtos</div>
        <div className="card-body">
          <h5 className="card-title">Produtos Cadastrados</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card text-bg-success mb-3" style={{ width: '18rem' }}>
        <div className="card-header">Vendas</div>
        <div className="card-body">
          <h5 className="card-title">Vendas Realizadas</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          </div>
        </div>
     </div>
  
     </div>
  </div>
  );
}

export default Dashboard;