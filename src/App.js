import React, {useState, useEffect} from 'react';

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect (()=> {
    api.get('repositories').then(response =>{
        setRepository(response.data);    
      });
  }, []); 


  async function handleAddRepository() {
    const response = await  api.post('repositories', {
      title: `Novo repositório do projeto desafio rocketseat ${Date.now()}`,
      url: "www.projetododesafio.com.br",
      techs: "React,VueJs"
  });

  const repository = response.data;

  setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await  api.delete(`repositories/${id}` );
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositoryIndex, 1);

    setRepository([...repositories]);

};

  return (
    <div>
        
      <ul data-testid="repository-list">
      {repositories.map( repository =>
                    <li key={repository.id}>{repository.title}
                    <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
                    </li>
                )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
