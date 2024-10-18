import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    quantidade: '',
    preco: ''
  });

  useEffect(() => {
    fetch('http://localhost:8081/api/produtos/findAll')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const handleUpdate = (id) => {
    const product = products.find(product => product.id === id);
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedProduct = currentProduct;
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setShowModal(false);

    fetch(`http://localhost:8081/api/produtos/update/${currentProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentProduct)
    })
    .then(response => response.json())
    .then(updatedProduct => {
      setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    })
    .catch(error => {
      console.error('Erro ao atualizar produto:', error);
      setProducts(products); // Reverter em caso de erro
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Nome', selector: row => row.name, sortable: true },
    { name: 'Quantidade', selector: row => row.quantidade, sortable: true },
    { name: 'Preço', selector: row => row.preco, sortable: true },
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
    setCurrentProduct(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <DataTable
        title="Lista de Produtos"
        columns={columns}
        data={products}
        pagination
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="text"
                name="quantidade"
                value={currentProduct.quantidade}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPreco">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                name="preco"
                value={currentProduct.preco}
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

export default ProductTable;