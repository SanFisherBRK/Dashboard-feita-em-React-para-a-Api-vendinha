

import logo from "../imagens/Products.png";
import { useState } from "react";

function CadastroProduto() {
  const [name, setName] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  async function salvar() {
    const userData = {
      name,
      quantidade,
      preco
    };

    try {
      let response = await fetch("http://localhost:8081/api/produtos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar produto");
      }

      alert("Poduto salvo com sucesso");

      let resposta = await response.json();
      console.log(resposta);
    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    }
  }

  return (
    <div class="container my-3 border"  id="formularioProduto">
      <form id="formProduto">
        <img src={logo} alt="Logo" type="image" />
        <h2>Products</h2><br/>

        <input 
        class="form-control" 
        type="text"
        name="name"
        id="quantidade"
        placeholder="Nome:" 
        aria-label="default input example"
        value={name}
        onChange={(e) => setName(e.target.value)}
        /><br/>

        <input 
        class="form-control" 
        type="text"
        name="quantidade"
        id="quantidade"
        placeholder="Quantidade:" 
        aria-label="default input example"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        /><br/>

        <input 
        class="form-control" 
        type="text" 
        name="preco"
        id="preco"
        placeholder="Preço:" 
        aria-label="default input example"
        value={preco}
          onChange={(e) => setPreco(e.target.value)}
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

export default CadastroProduto;
