
import "./CadastroUser.css";
import logo from "../imagens/Usuarios.png";
import { useState } from "react";

function CadastroUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");

  async function salvar() {
    const userData = {
      name,
      email,
      password,
      cpf,
      cnpj,
    };

    try {
      let response = await fetch("http://localhost:8081/api/users/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar usuário");
      }

      alert("Usuário salvo com sucesso");

      let resposta = await response.json();
      console.log(resposta);
    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    }
  }

  return (
    <div id="formulario">
      <form id="form">
        <img src={logo} alt="Logo" type="image" />
        <h2>Cadastrar-se</h2>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          name="nome"
          id="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="senha"
          id="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          name="cpf"
          id="input"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <label htmlFor="cnpj">CNPJ</label>
        <input
          type="text"
          name="cnpj"
          id="input"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />

        <input onClick={salvar} type="button" class="btn btn-primary" value="Cadastrar" />

        <a href="http://localhost:3000/Hopme">Home</a>
      </form>
    </div>
  );
}

export default CadastroUser;
