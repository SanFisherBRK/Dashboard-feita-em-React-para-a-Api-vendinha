import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function SidebarMenu() {
  return (
    <div className="bg-dark col-auto col-md-2 min-vh-100">
      <Link to="/" className="text-decoration-none text-white d-flex align-items-center ms-3 mt-2">
        <i className="fs-4 bi bi-speedometer"></i>
        <span className="ms-1 fs-4 my-1">Api Vendinha</span>
      </Link>
      <hr className="text-secondary" />
      <ul className="nav nav-pills flex-column">
        <li className="nav-item text-white fs-4 my-1">
          <Link to="/" className="nav-link text-white fs-5">
            <i className="bi bi-house"></i>
            <span className="ms-2">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item text-white fs-4 my-1">
          <Link to="/products" className="nav-link text-white fs-5">
            <i className="bi bi-grid"></i>
            <span className="ms-2">Produtos</span>
          </Link>
        </li>
        <li className="nav-item text-white fs-4 my-1">
          <Link to="/listarprodutos" className="nav-link text-white fs-5">
            <i className="bi bi-grid"></i>
            <span className="ms-2">Buscar Produtos</span>
          </Link>
        </li>
        <li className="nav-item text-white fs-4 my-1">
          <Link to="/vendas" className="nav-link text-white fs-5">
            <i className="bi bi-table"></i>
            <span className="ms-2">Vendas</span>
          </Link>
        </li>
        <li className="nav-item text-white fs-4 my-1">
          <Link to="/customers" className="nav-link text-white fs-5">
            <i className="bi bi-people"></i>
            <span className="ms-2">Usuários</span>
          </Link>
        </li>

        <li className="nav-item text-white fs-4 my-1">
          <Link to="/listarusuarios" className="nav-link text-white fs-5">
            <i className="bi bi-people"></i>
            <span className="ms-2">Buscar Usuários</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarMenu;