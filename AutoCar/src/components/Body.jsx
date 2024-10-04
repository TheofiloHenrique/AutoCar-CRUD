// Body.js
import React from 'react';

function Body({ 
  carros, handleEdit,handleDelete,marca,modelo,ano, price, setMarca, setPrice,setModelo,setAno, editMode, handleSubmit 
}) {
  return (
    <main className="body">
      {/* Container dos cards */}
      <div className="container">

        {/* Card para a lista de produtos */}
        <div className="products-card">
          <h2>Veículos Cadastrados </h2>
          <ul className="product-list">
            {carros.map((carro) => (
              <li key={carro.id} className="product-item">
                <div className="product-details">
                  <h3>{carro.marca}</h3>
                  <p>{carro.modelo}</p>
                  <p>{carro.ano}</p>
                  <p>R$ {carro.price}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEdit(carro)}>Editar</button>
                  <button onClick={() =>{
                    const msg = prompt("Deseja excluir? Digite sim ou não!").toLowerCase();
                    if(msg === "sim") handleDelete(carro.id)
                  }}>Deletar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card para o formulário */}
        <div className='form-card'>
          <h2>{editMode ? "Editar Carro" : "Cadastrar Carro"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Marca:
              <input
                type="text"
                value={marca}
                name='marca'
                onChange={(e) => setMarca(e.target.value)}
                required
                minLength="2"
              />
            </label>
            <label>
              Modelo:
              <input
                type="text"
                value={modelo}
                name='modelo'
                onChange={(e) => setModelo(e.target.value)}
                required
                minLength="2"
              />
            </label>
            <label>
              Ano:
              <input
                type="text"
                value={ano}
                name='ano'
                onChange={(e) => setAno(e.target.value)}
                required
                minLength="3"
              />
            </label>
            <label>
              Preço:
              <input
                type="number"
                value={price}
                name='price'
                onChange={(e) => setPrice(e.target.value)}
                required
                min = "0.01"
              
                
              />
            </label>
            <input type="submit" value={editMode ? "Atualizar" : "Criar"} />
          </form>
        </div>
      </div>
    </main>
  );
}

export default Body;