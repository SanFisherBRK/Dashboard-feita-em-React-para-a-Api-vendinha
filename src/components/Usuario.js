import "./usuario.css";
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
    <div className="container my-3 border" id="usuario">
      <form justify-content="center">
        <img src={logo} alt="Logo" />
        <br />
        <br />

        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="form6Example1"
                className="form-control"
                placeholder="Nome:"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />

            <div data-mdb-input-init className="form-outline">
              <input
                type="email"
                id="form6Example2"
                className="form-control"
                placeholder="Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="password"
            id="form6Example3"
            className="form-control"
            placeholder="Senha:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="text"
            id="form6Example4"
            className="form-control"
            placeholder="CPF:"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="text"
            id="form6Example5"
            className="form-control"
            placeholder="CNPJ:"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form6Example8"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="form6Example8">
            Create an account?
          </label>
        </div>

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

export default CadastroUser;
