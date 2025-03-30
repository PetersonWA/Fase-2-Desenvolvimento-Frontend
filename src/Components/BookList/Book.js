import React, { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPaintbrush } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";
import { GiConfirmed } from "react-icons/gi";
import { Button, TextField } from '@mui/material';

const Book = ({ book, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({ ...book });

    if (!book) {
      console.error("O objeto 'book' está indefinido.");
      return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
    };

    const handleSave = () => {

      // Garante que a data seja enviada como string no formato correto
      const updatedBook = {
        ...editedBook,
        readAt: editedBook.readAt, // Já está no formato "YYYY-MM-DD"
      };

      if (onEdit) {
          onEdit(book.id, updatedBook);
      } else {
          console.error("A função onEdit não foi fornecida.");
      }
      setIsEditing(false);
    };

    const handleDelete = () => {
      if (window.confirm("Tem certeza de que deseja excluir este livro?")) {
        onDelete();
      }
    };

   
    return (
      <>
      {isEditing ? (
        <li>
        <TextField
          fullWidth
          color='gray'
          type="text"
          name="title"
          value={editedBook.title}
          onChange={handleInputChange}
          placeholder="Título"
          label="Título"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          color='gray'
          type="text"
          name="author"
          value={editedBook.author}
          onChange={handleInputChange}
          placeholder="Autor"
          label="Autor"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        /> 
        <TextField
          fullWidth
          color='gray'
          type="text"
          name="genre"
          value={editedBook.genre}
          onChange={handleInputChange}
          placeholder="Gênero"
          label="Gênero"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          color='gray'
          type="date"
          name="readAt"
          value={editedBook.readAt}
          onChange={handleInputChange}
          label="data"
          InputLabel={{ 
          shrink: true
          }}
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <Button variant='outlined' color='success' size="large" onClick={handleSave} style={{ marginLeft: "10px" }}><GiConfirmed /></Button>
        <Button variant='outlined' color='error' size="large" onClick={() => setIsEditing(false)} style={{ marginLeft: "10px" }}><ImCancelCircle /></Button>
      </li>
      ) : (
        <li>
          <h3>{book.title}</h3>
          <p>Autor: {book.author}</p>
          <p>Gênero: {book.genre}</p>
          <p>Data: {new Date(book.readAt).toLocaleDateString()}</p>
          <Button variant="outlined" color='black' size="large" onClick={() => setIsEditing(true)} style={{ marginLeft: "10px" }}><LuPaintbrush /></Button>
          <Button variant='outlined' color='black' size="large" onClick={handleDelete} style={{ marginLeft: "10px" }}><FaRegTrashCan /></Button>
        </li>
      )}
      </>
    );
};

export default Book;
