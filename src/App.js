import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Components/NavBar/NavBar';
import BookForm from './Components/BookForm/BookForm';
import BookList from './Components/BookList/BookList';
import './index.css';


function App() {
  const Links = ["Página incial", "Sobre","Lista de livros", "Cadastro de livros"]
  const [books, setBooks] = useState([]);

  // URL base da API
  const apiUrl = "http://localhost:5000/books";

  // Buscar livros da API ao carregar o componente
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setBooks(response.data); // Atualiza o estado com os livros retornados pela API
      })
      .catch(error => {
        console.error("Erro ao buscar livros:", error);
      });
  }, []);


  // Adicionar um novo livro
  const addBook = (newBook) => {
    axios.post(apiUrl, newBook)
      .then(response => {
        setBooks([...books, response.data]); // Adiciona o novo livro ao estado
      })
      .catch(error => {
        console.error("Erro ao adicionar livro:", error);
      });
  };

  // Excluir um livro
  const deleteBook = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id)); // Remove o livro do estado
      })
      .catch(error => {
        console.error("Erro ao excluir livro:", error);
      });
  };

  // Editar um livro
  const editBook = (id, updatedBook) => {
    // Inclui o ID no corpo da requisição
    const bookWithId = { id, ...updatedBook };
  
    axios.put(apiUrl, bookWithId) // A API não usa o ID na URL
      .then(response => {
        // Atualiza o estado com o livro editado
        setBooks(books.map(book => (book.id === id ? response.data : book)));
      })
      .catch(error => {
        console.error("Erro ao editar livro:", error);
      });
  };



  // Renderiza o componente
  return ( 
    <Router>
      <div>
        <NavBar Links={Links} />
        <Routes>
          <Route path="/" element={<div className="home" > 
                                        <h1>Diário de Leitura</h1>
                                  </div>} />
          <Route path="/sobre" element={<div className="sobre" >
                                          <h1>Sobre</h1>
                                          <p>Está é uma aplicação para um CRUD de um Reading jornal.
                                             Este projeto foi elaborado na disciplina de Desenvolvimento
                                             de Sistemas Frontend do Curso de Graduação Online da PUCRS
                                          </p>                                      
                                        </div>} />
          <Route path="/lista-de-livros" element={<BookList books={books} onDeleteBook={deleteBook}  onEditBook={editBook}/>} />
          <Route path="/cadastro-de-livros" element={<BookForm onAddBook={addBook} />} />
        </Routes>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </Router>
  );
}

export default App;
