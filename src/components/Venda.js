import logo from "../imagens/Products.png";
import { useState } from "react";

function CadastroVenda() {
  const [quantidade, setQuantidade] = useState("");
  const [userId, setUserId] = useState("");
  const [produtoId, setProdutoId] = useState("");

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
    <div class="container my-3 border" id="formularioProduto">
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
        /><br/>
        
        <input
          className="form-control"
          type="text"
          name="user"
          id="user"
          placeholder="User:"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        /><br/>
        <input
          className="form-control"
          type="text"
          name="produto"
          id="produto"
          placeholder="Produto:"
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
        /><br/>
        <button
          data-mdb-ripple-init
          type="button"
          className="btn btn-outline-dark btn-lg btn-block mb-4"
          onClick={salvar}
        >
          Salvar
        </button>
        
      </form>
    </div>
  );
}

export default CadastroVenda;
