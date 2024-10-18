import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    cpf: '',
    cnpj: ''
  });

  useEffect(() => {
    fetch('http://localhost:8081/api/users/findAll')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleUpdate = (id) => {
    const user = users.find(user => user.id === id);
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:8081/api/users/update/${currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentUser)
    })
    .then(response => response.json())
    .then(updatedUser => {
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setShowModal(false);
    })
    .catch(error => console.error('Erro ao atualizar usuário:', error));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Nome', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Password', selector: row => row.password, sortable: true },
    { name: 'CPF', selector: row => row.cpf, sortable: true },
    { name: 'CNPJ', selector: row => row.cnpj, sortable: true },
    {
      name: 'Ações',
      cell: row => (
        <div>
          <Button variant="warning" onClick={() => handleUpdate(row.id)} className="me-2">
            Atualizar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <DataTable
        title="Lista de Usuários"
        columns={columns}
        data={users}
        pagination
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={currentUser.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={currentUser.cpf}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCnpj">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                name="cnpj"
                value={currentUser.cnpj}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
