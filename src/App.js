import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SidebarMenu from "./components/SiderbarMenu";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Venda from "./components/Venda";
import Usuario from "./components/Usuario"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import VendaList from "./components/VendaList";



function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <SidebarMenu />
          <div className="col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Usuario />} />
              <Route path="/products" element={<Products />} />
              <Route path="/vendas" element={<Venda />} />
              <Route path="/listarvendas" element={<VendaList />} />
              <Route path="/listarusuarios" element={<UserList />} />
              <Route path="/listarprodutos" element={<ProductList />} />
              <Route path="/users" element={<UserList />} /> {/* Nova Rota */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;