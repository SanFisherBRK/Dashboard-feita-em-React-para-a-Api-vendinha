import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';

const VendaTable = () => {
  const [vendas, setVendas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentVenda, setCurrentVenda] = useState({
    id: '',
    quantidade: '',
    price: '',
    user: { name: '' },
    produto: { name: '' }
  });

  useEffect(() => {
    fetch('http://localhost:8081/api/vendas/findAll')
      .then(response => response.json())
      .then(data => setVendas(data));
  }, []);

  const handleUpdate = (id) => {
    const venda = vendas.find(venda => venda.id === id);
    setCurrentVenda(venda);
    setShowModal(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:8081/api/vendas/update/${currentVenda.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentVenda)
    })
    .then(response => response.json())
    .then(updatedVenda => {
      setVendas(vendas.map(venda => venda.id === updatedVenda.id ? updatedVenda : venda));
      setShowModal(false);
    })
    .catch(error => console.error('Erro ao atualizar venda:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/api/vendas/delete/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setVendas(vendas.filter(venda => venda.id !== id));
    })
    .catch(error => console.error('Erro ao excluir venda:', error));
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Produto', selector: row => row.produto.name, sortable: true },
    { name: 'Quantidade', selector: row => row.quantidade, sortable: true },
    { name: 'Preço', selector: row => row.price, sortable: true },
    { name: 'Usuário', selector: row => row.user.name, sortable: true },
    
  ];

  const handleRowClick = (row) => {
    setCurrentVenda(row);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentVenda(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="my-4 border">
      <DataTable
        title="Lista de Vendas"
        columns={columns}
        data={vendas}
        pagination
        onRowClicked={handleRowClick}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Venda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProdutoName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="produto.name"
                value={currentVenda.produto.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="text"
                name="quantidade"
                value={currentVenda.quantidade}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPreco">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                name="preco"
                value={currentVenda.price}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formUserName">
              <Form.Label>Usuárrio</Form.Label>
              <Form.Control
                type="text"
                name="user.name"
                value={currentVenda.user.name}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
       
      </Modal>
    </div>
  );
};

export default VendaTable;