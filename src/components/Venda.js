import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import logo from "../imagens/Products.png";

function CadastroVenda() {
  const [quantidade, setQuantidade] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [produtoName, setProdutoName] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProdutoModal, setShowProdutoModal] = useState(false);

  useEffect(() => {
    // Buscar usuários e produtos para os modais de seleção
    fetch("http://localhost:8081/api/users/findAll")
      .then(response => response.json())
      .then(data => setUsuarios(data));

    fetch("http://localhost:8081/api/produtos/findAll")
      .then(response => response.json())
      .then(data => setProdutos(data));
  }, []);

  async function salvar(event) {
    event.preventDefault();
    if (!quantidade || !userId || !produtoId) {
      alert("Preencha todos os campos");
      return;
    }
    const userData = {
      quantidade,
      user: { id: userId },
      produto: { id: produtoId },
    };
    try {

      let response = await fetch("http://localhost:8081/api/vendas/venda", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify(userData),

      });

      if (!response.ok) {
        throw new Error("Erro ao salvar a venda");
      }

      let resposta = await response.json();
      console.log(resposta);

      alert("Venda feita com sucesso");

    } catch (error) {

      console.error("Erro:", error);
      alert(error.message);

    }
  }

  return (
    <div className="container my-3 border" id="formularioProduto">
      <form id="formProduto" onSubmit={salvar}>
        <img src={logo} alt="Logo" />
        <h2>Venda</h2>

        <input
          className="form-control"
          type="text"
          name="quantidade"
          id="quantidade"
          placeholder="Quantidade:"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        /><br />

        <Button variant="outline-dark" onClick={() => setShowUserModal(true)}>
          Selecionar Usuário
        </Button>

        <input
          className="form-control"
          type="text"
          name="userId"
          id="userId"
          placeholder="ID do Usuário"
          value={userId}
          readOnly
        /><br />

        <input
          className="form-control"
          type="text"
          name="userName"
          id="userName"
          placeholder="Nome do Usuário"
          value={userName}
          readOnly
        /><br />

        <Button variant="outline-dark" onClick={() => setShowProdutoModal(true)}>
          Selecionar Produto
        </Button>

        <input
          className="form-control"
          type="text"
          name="produtoId"
          id="produtoId"
          placeholder="ID do Produto"
          value={produtoId}
          readOnly
        /><br />

        <input
          className="form-control"
          type="text"
          name="produtoName"
          id="produtoName"
          placeholder="Nome do Produto"
          value={produtoName}
          readOnly
        /><br />

        <button
          data-mdb-ripple-init
          type="submit"
          className="btn btn-outline-dark btn-lg btn-block mb-4"
        >
          Salvar
        </button>
        
      </form>

      {/* Modal para Selecionar Usuário */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Selecionar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarios.map(usuario => (
            <Button
              key={usuario.id}
              variant="outline-dark"
              className="d-block w-100 my-2"
              onClick={() => {
                setUserId(usuario.id);
                setUserName(usuario.name);
                setShowUserModal(false);
              }}
            >
              {usuario.name}
            </Button>
          ))}
        </Modal.Body>
      </Modal>

      {/* Modal para Selecionar Produto */}
      <Modal show={showProdutoModal} onHide={() => setShowProdutoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Selecionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {produtos.map(produto => (
            <Button
              key={produto.id}
              variant="outline-dark"
              className="d-block w-100 my-2"
              onClick={() => {
                setProdutoId(produto.id);
                setProdutoName(produto.name);
                setShowProdutoModal(false);
              }}
            >
              {produto.name}
            </Button>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CadastroVenda