
import React from "react";
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";


export default function BookForm({ onAddBook }) {
  const [book, setBook] = useState({
    id: Math.floor(Math.random() * 10000),
    title: "",
    author: "",
    genre: "",
    readAt: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleBookFormSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.genre || !book.readAt) {
      setError("Por favor, preencha todos os campos antes de enviar.");
      setSuccessMessage("");
      return;
    }
    setError("");
    setSuccessMessage("Livro adicionado com sucesso!");
    onAddBook(book);
    setBook({
      title: "",
      author: "",
      genre: "",
      readAt: "",
    });

    setTimeout(() => {
      setSuccessMessage("");
    }, 10000);
  };

  return (
    <> 
    
   
   
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        textAlign: "center",
        padding: 2,
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.66)",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Sombra discreta
      }}
    >
      <Typography 
        variant="h4"  
        component="h1" 
        sx={{
          fontFamily: 'Montez',  /* Aplicando a fonte cursiva */
          color: "black", /* Mantendo a cor */
          fontSize: '3.5rem',
          fontWeight: 'normal',
        }}>
        <b>Cadastrar</b>
      </Typography>
      <br/>
      <Typography 
        variant="h6"
        component="h2" 
        sx={{
          fontFamily: 'Montez',  /* Aplicando a fonte cursiva */
          color: "black", /* Mantendo a cor */
          fontSize: '2.0rem',
          fontWeight: 'normal',
        }}>
        <b>Adicione a leitura realizada</b>
      </Typography>
      <form onSubmit={handleBookFormSubmit}>
        <TextField
          fullWidth
          color="gray"
          margin="normal"
          placeholder="Título"
          label="Título"    
          name="title"
          value={book.title}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          color="gray"
          margin="normal"
          placeholder="Autor(a)"
          label="Autor(a)"
          name="author"
          value={book.author}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          color="gray"
          margin="normal"
          placeholder="Gênero"
          label="Gênero"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          color="gray"
          margin="normal"
          placeholder="Lido na data"
          name="readAt"
          type="date"
          value={book.readAt}
          onChange={handleChange}
          slotProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Adicionar Livro!
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          {successMessage}
        </Alert>
      )}
    </Box>
   
    </>
  );
}




































/*
import React from "react";
import { useState } from "react";



export default function BookForm({ onaddBook }) {

    const [book, setBook] = useState({
        title: "",
        autor: "",
        genero: "",
        data: "",
    })

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleBookFormSubmit = (e) => {
        e.preventDefault();
        // Verificação se todos os campos estão preenchidos
        if (!book.title || !book.autor || !book.genero || !book.data) {
            setError("Por favor, preencha todos os campos antes de enviar.");
            setSuccessMessage(""); // Limpa a mensagem de sucesso
            return;
        }        
        setError(""); // Limpa a mensagem de erro e adiciona o livro
        setSuccessMessage("Livro adicionado com sucesso!"); // Define a mensagem de sucesso
        onaddBook(book); // Usa a função passada via props
        setBook({
          title: "",
          autor: "",
          genero: "",
          data: "",
        });
      };

      // Remove a mensagem de sucesso após 10 segundos
      setTimeout(() => {setSuccessMessage("");}, 10000);
        
    

    return (
        <>
        <div className="book-form" style={{textAlign: "center"}} >
        <h1>Cadastrar</h1>
        <h2>Adicione um livro</h2>
        <form onSubmit={handleBookFormSubmit}>
            <input 
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Título"
                style={{ marginBottom: "10px" }}
            />
            <br/>
            <input
                type="text"
                name="autor"
                value={book.autor}
                onChange={handleChange}
                placeholder="Autor(a)"
                style={{ marginBottom: "10px" }}
            />
            <br/>
            <input
                type="text"
                name="genero"
                value={book.genero}
                onChange={handleChange}
                placeholder="Genero"
                style={{ marginBottom: "10px" }}
            />
            <br/>
            <input
                type="date"
                name="data"
                value={book.data}
                onChange={handleChange}
                placeholder="Data de lançamento"
                style={{ marginBottom: "10px" }}
            />
            <br/>
            <button type="submit"  >Adicionar Livro!</button>
        </form>

            {/* Exibe a mensagem de erro, se houver *//*}
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            {/* Exibe a mensagem de sucesso, se houver *//*}
            {successMessage && <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>}

        </div>
        </>
    );
    

}

*/