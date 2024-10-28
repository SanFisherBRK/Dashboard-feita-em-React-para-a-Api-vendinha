
// Importa a imagem do logo
import logo from "../imagens/Products.png"; 
// Importa o hook useState do React
import { useState } from "react";

function CadastroProduto() {

  // Define os estados para armazenar os valores dos inputs
  const [name, setName] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  // Função para salvar o produto
  async function salvar() {
    const userData = {
      name,
      quantidade,
      preco
    };

    try {

      // Envia uma requisição POST para salvar o produto no servidor
      let response = await fetch("http://localhost:8081/api/produtos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // Converte os dados do produto em JSON
        body: JSON.stringify(userData),

      });

      if (!response.ok) {

        // Lança um erro se a resposta não for ok
        throw new Error("Erro ao salvar produto");

      }

      // Exibe uma mensagem de sucesso
      alert("Poduto salvo com sucesso");
      let resposta = await response.json();

      // Imprime a resposta no console
      console.log(resposta);

    } catch (error) {

      // Imprime o erro no console
      console.error("Erro:", error);

      // Exibe a mensagem de erro
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

// Exporta o componente CadastroProduto
export default CadastroProduto;
