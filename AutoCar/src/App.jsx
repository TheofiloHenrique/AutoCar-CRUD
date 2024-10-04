// App.js
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './App.css';

// URL da API simulada com json-server
const url = "http://localhost:3000/carros";

function App() {
  const [carros, setCarros] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [price, setPrice] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // useEffect para buscar os produtos ao montar o componente
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(url);
      const data = await resp.json();
      setCarros(data);
    }
    fetchData();
  }, []);

  // Função para adicionar ou editar produto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const carro = { marca,modelo,ano, price:parseFloat(price) };
    let hoje = new Date();
    let anoHoje = hoje.getFullYear();
    let res;

    if(carro.ano <1900 || carro.ano > anoHoje) return alert("O ano deve ser um número entre 1900 e o ano atual! (2024)");

    if (editMode) {
      res = await fetch(`${url}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(carro),
      });

      setEditMode(false);
      setEditId(null);
    } else {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(carro),
      });
    }

    const data = await res.json();
    setCarros((prevProducts) => {
      if (editMode) {
        return prevProducts.map((p) => (p.id === data.id ? data : p));
      } else {
        return [...prevProducts, data];
      }
    });

    setMarca("");
    setModelo("");
    setAno("");
    setPrice("");
  };

  // Função para deletar um produto
  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    setCarros((prevProducts) => prevProducts.filter((carro) => carro.id !== id));
  };


  

  // Função para iniciar a edição de um produto
  const handleEdit = (carro) => {
    setMarca(carro.marca);
    setModelo(carro.modelo);
    setAno(carro.ano);
    setPrice(carro.price);
    setEditMode(true);
    setEditId(carro.id);
  };

  return (
    <>
      <Header />
      <Body 
        carros={carros}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        marca={marca}
        modelo={modelo}
        ano={ano}
        price={price}
        setMarca={setMarca}
        setModelo={setModelo}
        setAno={setAno}
        setPrice={setPrice}
        editMode={editMode}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </>
  );
}

export default App;